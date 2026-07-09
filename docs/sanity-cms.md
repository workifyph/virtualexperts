# Sanity CMS — Virtual Experts

This site uses **Sanity** for blog posts and case studies. Non-technical editors
manage content in **Sanity Studio**, a small admin app embedded in this site at
`/studio`.

The site itself is a **Next.js static export** deployed to **Cloudflare Pages**
via GitHub Actions. New CMS content is published to the live site by
re-deploying the static build.

> **See also: [`infrastructure.md`](./infrastructure.md)** — canonical record
> of which Cloudflare / Sanity / GitHub accounts own this site, the dev/prod
> environment split, deploy triggers, and the rollback runbook.

## Architecture at a glance

| Layer        | Tech                                               |
| ------------ | -------------------------------------------------- |
| CMS          | Sanity (hosted dataset, GROQ queries)              |
| Studio UI    | next-sanity, embedded at `/studio`                 |
| Site         | Next.js 16 App Router with `output: "export"`      |
| Hosting      | Cloudflare Pages                                   |
| CI / Deploys | GitHub Actions (`wrangler pages deploy`)           |

Editors **never edit code** — they only edit content in Sanity Studio.

## Required environment variables

Both the build (GitHub Actions) and the Studio need these:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

- Local: copy `.env.local.example` to `.env.local`.
- GitHub Actions: add as repo secrets, then expose them as `env` in the build job.
- Cloudflare Pages (only needed if you serve the Studio from Pages and run a Pages Function): add as project env vars in the Cloudflare dashboard.

## First-time Sanity setup

1. Create a free project at <https://www.sanity.io/manage>.
2. Note the **Project ID** and **Dataset name** (default: `production`).
3. Add the three env vars above to `.env.local`.
4. Add the same vars to **GitHub → Settings → Secrets and variables → Actions**.
5. Add CORS origins in Sanity → API → CORS for:
   - `http://localhost:3000`
   - `https://<your-cloudflare-pages-domain>`
   - your production domain.

## Running Sanity Studio

The Studio is embedded in the Next site and also runs standalone.

**Embedded (recommended for editors):**

```bash
npm run dev
# open http://localhost:3000/studio
```

**Standalone (for schema work):**

```bash
npm run sanity:dev
# opens the Studio on its own dev server
```

Editors should use the embedded Studio — same project, same data, just inside
the live site.

## Authoring content

### Add a blog post

1. Visit `/studio` and sign in with the email invited to the Sanity project.
2. Click **Blog posts → Create new**.
3. Fill in:
   - Title (8–120 chars, required)
   - URL slug (auto-generated from title)
   - Excerpt (1–2 sentences shown on the index, required)
   - Featured image (required, with **alt text** for accessibility)
   - Author (pick from the Authors list)
   - Published at (required)
   - Category & tags (optional)
   - Body (rich text, images, links, headings)
   - SEO title / description (optional overrides)
4. Click **Publish**.

### Add a case study

1. **Case studies → Create new**.
2. Fill in:
   - Title, slug, client industry
   - Featured image (with alt text)
   - Excerpt
   - Challenge → Solution → Results
   - Stats (up to 6, each with `label` + `value` like `40%`, `2x`, `12 hrs`)
   - Testimonial (quote + author + role)
   - Featured? (check to surface on the homepage)
   - Body (optional long-form section)
   - SEO fields
3. Click **Publish**.

### Authors and categories

Authors and categories are reusable. Create them once under the **Authors**
and **Categories** sections in the sidebar, then reference them from posts.

## Publishing flow (how content reaches production)

1. Editor publishes content in Sanity Studio.
2. Editor (or an automation) triggers the GitHub Actions deploy workflow.
3. The build runs `next build` with `output: "export"`, which fetches all
   published posts and case studies from Sanity and bakes them into static HTML.
4. The `out/` directory is uploaded to **Cloudflare Pages** with
   `wrangler pages deploy`.
5. New content is live within a few minutes.

### Auto-deploy on publish (recommended)

Configure a Sanity → GitHub Actions webhook so publishing a post triggers a
rebuild automatically:

1. In GitHub: create a Personal Access Token with `repo:public_repo` (or `repo`)
   scope, then add a `repository_dispatch` workflow trigger:

   ```yaml
   # .github/workflows/deploy.yml
   on:
     push:
       branches: [main]
     repository_dispatch:
       types: [sanity-publish]
   ```

2. In Sanity Studio → Manage → API → Webhooks, add a new webhook:
   - URL: `https://api.github.com/repos/<owner>/<repo>/dispatches`
   - HTTP method: POST
   - Headers: `Authorization: Bearer <github-token>`, `Accept: application/vnd.github+json`
   - Body:
     ```json
     {"event_type": "sanity-publish"}
     ```

When an editor publishes, GitHub Actions runs the deploy and Cloudflare Pages
serves the new static build.

## Cloudflare Pages notes

- Static export only. **No Vercel-only APIs** are used (no `next/og`, no
  `unstable_cache`, no Server Actions, no preview cookies).
- `next/image` optimization is **disabled** (`images.unoptimized: true`)
  because the Pages output is static. Sanity's image CDN is used for sized
  variants via `urlFor(...).width(...).height(...).url()`.
- The Studio is a single-page app under `/studio`. `public/_redirects`
  contains a SPA fallback so deep-links like `/studio/structure/post` route
  to the Studio shell:
  ```
  /studio/* /studio 200
  ```

## Local files

| Path                          | Purpose                                    |
| ----------------------------- | ------------------------------------------ |
| `sanity.config.ts`            | Studio config (schemas, plugins, basePath) |
| `src/sanity/env.ts`           | Env var loading + validation               |
| `src/sanity/schemas/*.ts`     | Schema definitions                         |
| `src/sanity/structure.ts`     | Studio sidebar layout                      |
| `src/lib/sanity/client.ts`    | Read-only Sanity client                    |
| `src/lib/sanity/queries.ts`   | GROQ queries                               |
| `src/lib/sanity/fetch.ts`     | Build-time fetch helpers (with fallbacks)  |
| `src/lib/sanity/image.ts`     | `urlFor()` image URL builder               |
| `src/app/studio/page.tsx`     | Studio route                               |
| `src/app/blog/...`            | Blog index + post pages                    |
| `src/app/case-studies/...`    | Case study index + detail pages            |
| `public/_redirects`           | Cloudflare SPA fallback for `/studio/*`    |

## Troubleshooting

**Studio shows a blank page.**
Make sure CORS origins are added in Sanity for both your local URL and
production URL.

**Build fails with "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID".**
The build needs the env vars set. Add them to GitHub Actions repo secrets and
to your local `.env.local`. The site will fall back to local content if the
client cannot reach Sanity, but the Studio route requires real values.

**A new post isn't showing up on the live site.**
Static exports only update on rebuild. Trigger a deploy (push to main, or
re-run the GitHub Actions workflow), or set up the webhook above.
