# Virtual Experts — Infrastructure & Account Map

Single source of truth for *where things live*. Update this file whenever an
account, project ID, domain, or environment changes.

> **History note (2026-07-08):** the site previously used Sanity CMS for blog
> and case-study content. Sanity was decommissioned — all content was exported
> to markdown in `content/` (images in `public/blog/`), the `/studio` route
> and Sanity webhook (`DdtAZLnqwBKXkah8`) were removed, and the Sanity project
> is no longer required to build or run the site. See
> [`blog-authoring-guide.md`](./blog-authoring-guide.md) for the current
> authoring workflow.

## Accounts

| Service        | Account / Owner                | Notes                                                            |
| -------------- | ------------------------------ | ---------------------------------------------------------------- |
| GitHub repo    | `workifyph/virtualexperts`     | Default branch: `main`. Also hosts all blog content (`content/blog/`). |
| Cloudflare     | `Workify.ph.hq@gmail.com`      | **Not** under `aisaiah.platform@gmail.com` — that's a different account |
| Domain (DNS)   | Cloudflare (same account)      | `virtualexperts.ph`                                              |

> **Important:** Cloudflare deploys (Pages projects, secrets, DNS) live under
> the **`Workify.ph.hq@gmail.com`** Cloudflare account. Do not run `wrangler`
> commands while logged into a different account — they will silently target
> the wrong account or fail with auth errors.

### Switching `wrangler` to the right Cloudflare account

You have two options. The token approach is preferred for CI; the OAuth login
is preferred locally.

**Option 1 — local OAuth login (interactive):**

```bash
npx wrangler logout
npx wrangler login          # browser opens; sign in with Workify.ph.hq@gmail.com
npx wrangler whoami         # confirm the account name shown is "Workify.ph.hq@gmail.com's Account"
```

**Option 2 — API token (works in CI and locally):**

1. Sign in to <https://dash.cloudflare.com> as `Workify.ph.hq@gmail.com`.
2. Go to **My Profile → API Tokens → Create Token**.
3. Use the **Edit Cloudflare Workers** template (or create custom with scopes:
   `Account.Cloudflare Pages: Edit`, `Account.Account Settings: Read`,
   `Zone.DNS: Edit` if you also manage DNS here).
4. Save as `CLOUDFLARE_API_TOKEN` (and the account ID as `CLOUDFLARE_ACCOUNT_ID`)
   in:
   - GitHub Actions repo secrets (for CI deploys).
   - Local shell only when needed: `export CLOUDFLARE_API_TOKEN=...`.

Once the token is set in env, `wrangler` skips OAuth entirely.

### Common gotcha: stale wrangler cache

`node_modules/.cache/wrangler/` caches the last-used account ID. If you switch
accounts and start seeing `Authentication error [code: 10000]`, clear it:

```bash
rm -rf node_modules/.cache/wrangler
```

## Environments

The site has **two environments**, served from two different Cloudflare Pages
projects. Content committed to `dev` reaches **dev only**; prod is gated
behind an approved branch merge (or an approved scheduled run).

| Environment | Branch | Cloudflare Pages project   | Domain                     |
| ----------- | ------ | -------------------------- | -------------------------- |
| Development | `dev`  | `virtualexperts-preview`   | `dev.virtualexperts.ph`    |
| Production  | `main` | `virtualexperts`           | `virtualexperts.ph`, `www.virtualexperts.ph` |

> The dev project is named `virtualexperts-preview` for historical reasons —
> Cloudflare Pages does not support renaming projects. Its production-branch
> field is set to `dev`, so the custom-domain alias `dev.virtualexperts.ph`
> serves dev-branch deploys.

## Content model

- Blog posts: one markdown file per post in `content/blog/<slug>.md`
  (frontmatter + body). Case studies: `content/case-studies/<slug>.md`.
- Images: committed under `public/blog/` (web-sized WebP, ≤ ~500 KB each).
- **Scheduling:** the build excludes posts whose frontmatter `date` is in the
  future. Scheduled rebuilds (below) pick up newly-due posts automatically —
  this is how the weekly drip works.

## Deploy triggers

| Trigger                              | Workflow                          | Result                          |
| ------------------------------------ | --------------------------------- | ------------------------------- |
| `git push` to `dev`                  | `.github/workflows/deploy-dev.yml`  | Build + deploy to `virtualexperts-preview` |
| Daily cron 22:00 UTC (6am PH)        | `.github/workflows/deploy-dev.yml`  | Same — publishes newly-due posts on dev |
| PR merged: `dev → main`              | `.github/workflows/deploy-prod.yml` | Approval-gated; deploys to `virtualexperts` |
| Weekly cron Mon 22:00 UTC (Tue 6am PH) | `.github/workflows/deploy-prod.yml` | Same — still waits for approval |

The **production** workflow uses a GitHub **Environment** named `production`
with **required reviewers**. Even when a schedule or `main` push triggers the
workflow, the deploy step waits until a reviewer approves it.

## What the VA / content editor sees

VAs and content editors work entirely in the browser on **github.com** — no
terminal, no Cloudflare access, no deploy machinery.

```
VA browser → github.com → content/blog/ (branch: dev)
   → add or edit a markdown file
   → commit to dev
   → GitHub Actions builds → wrangler pages deploy
   → dev.virtualexperts.ph updates (~3–5 min)
```

**What the VA needs:** a GitHub account with write access to the repo, and
the [authoring guide](./blog-authoring-guide.md).

**What the VA never needs:** Cloudflare login, wrangler, Node, SSH, or any
infrastructure credentials.

### Keep the dev site publicly viewable

The Cloudflare Pages projects (`virtualexperts-preview`, `virtualexperts`)
must be left **default-public** so VAs can view their work without Cloudflare
auth. By default, `*.pages.dev` URLs and any attached custom domain are
readable by anyone.

> **Do not** attach a Cloudflare Access policy to the dev Pages project.
> Doing so would gate the site behind a Cloudflare login, breaking the VA
> workflow. If you later want to keep the dev URL out of search engines, use
> a `noindex` header / robots.txt rule instead — *not* an Access policy.

If you ever need to password-protect dev temporarily (e.g., before a launch),
prefer a basic-auth header in `_headers` or a Cloudflare Worker, not Access.
That way you can hand the password to VAs without giving them Cloudflare
accounts.

## Rollback runbook

Content and code share one history now: **git**. Rollback is a revert.

**Bad change caught on dev (preferred case):**

1. Editor commits a bad post/edit to `dev` → dev rebuilds → bad content
   visible on `dev.virtualexperts.ph`.
2. **Do not merge `dev → main`.**
3. Revert the commit (GitHub → commit → "Revert"), or re-edit the file.
4. Dev rebuilds on the revert commit → verify.
5. Once green, approve the `dev → main` merge.

**Bad change reached prod:**

1. **Immediate stopgap:** Cloudflare dashboard → Pages → `virtualexperts`
   → Deployments → previous green deployment → "Rollback to this
   deployment". Site is reverted within seconds.
2. **Permanent fix:** revert the offending commit on `dev`, verify on dev,
   then merge `dev → main` and approve. The next prod deploy matches the
   restored state and the Cloudflare-level rollback becomes redundant.

**Editor wants to stage work without affecting dev:**

- Date the post in the future — it stays hidden until the date passes.
- Or work in a personal branch and open a PR into `dev` when ready.

## Project IDs and IDs at a glance

| Thing                         | Value                                      |
| ----------------------------- | ------------------------------------------ |
| Cloudflare account            | `Workify.ph.hq@gmail.com`                  |
| Cloudflare account ID         | `8989d421b40e5722753ce9378579c5ff`         |
| Cloudflare zone ID            | `c4c53c15e255d0ed3bf6b83e262317a8` (virtualexperts.ph) |
| Prod Pages project            | `virtualexperts`                           |
| Dev Pages project             | `virtualexperts-preview` (production_branch = `dev`) |
| GitHub repo                   | `workifyph/virtualexperts`                 |
| Default branch                | `main`                                     |
| Dev branch                    | `dev`                                      |
| GitHub Environment (prod gate)| `production` — required reviewer: `workifyph` |

## CI secrets in GitHub Actions

Set under **Repo → Settings → Secrets and variables → Actions**:

| Secret                            | Source                          |
| --------------------------------- | ------------------------------- |
| `CLOUDFLARE_API_TOKEN`            | Custom token: Pages:Edit, DNS:Edit, Zone:Read |
| `CLOUDFLARE_ACCOUNT_ID`           | `8989d421b40e5722753ce9378579c5ff` |

The `NEXT_PUBLIC_SANITY_*` and `SANITY_API_READ_TOKEN` secrets are no longer
used by any workflow and can be deleted from repo settings.

To rotate the Cloudflare token: create new at <https://dash.cloudflare.com/profile/api-tokens>, then
`gh secret set CLOUDFLARE_API_TOKEN -R workifyph/virtualexperts --body <new>`, then delete the old token in CF dashboard.
