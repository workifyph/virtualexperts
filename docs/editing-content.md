# Editing the site — the one-page procedure

Everything an editor changes on this site is a **folder with a text file
and a photo in it**. There is no CMS, no login, no admin panel. You edit
a file, push, and the site rebuilds itself.

The four content types all work the same way. This page is the map; each
folder has its own detailed guide.

| What you want to change            | Where it lives          | Detailed guide                |
| ---------------------------------- | ----------------------- | ----------------------------- |
| **Blog posts**                     | `content/blog/`         | [`content/README.md`](../content/README.md) |
| **Case studies**                   | `content/case-studies/` | [`content/README.md`](../content/README.md) |
| **VA profiles** (Talent Pool page) | `public/talent/`        | [`public/talent/README.md`](../public/talent/README.md) |
| **Executive photos** (About page)  | `public/leadership/`    | [`public/leadership/README.md`](../public/leadership/README.md) |

---

## The pattern, once

Every content type follows the same three rules:

**1. One folder = one thing.** A blog post, a case study, a VA, an
executive. The folder name becomes the web address, so use lowercase
letters, numbers, and dashes only:

```
content/blog/why-hiring-a-va-works/   ->  virtualexperts.ph/blog/why-hiring-a-va-works
public/talent/maria-santos/           ->  virtualexperts.ph/talent/maria-santos
```

**2. A text file holds the details.** It opens with a block of
`key: value` lines between two `---` lines, and anything after that is
the write-up:

```
---
title: Why Hiring a VA Works
date: 2026-08-03
---

The article, bio, or description starts here.
```

Keep both `---` lines exactly as they are. That block is the single most
common thing to break — see any guide's Troubleshooting section.

**3. An underscore hides it.** A folder starting with `_` is invisible
on the site:

```
content/blog/_my-draft/     draft — not published
content/blog/my-draft/      live
```

Rename the folder to publish or unpublish. That is the entire publishing
workflow.

## Publishing, once

Same for all four types:

1. Make your change on the **`dev`** branch.
2. Wait ~2 minutes, then check **https://dev.virtualexperts.ph**.
3. Happy? Open a pull request from `dev` → `main` on GitHub and merge it.
   The live site updates a couple of minutes later.

**Never edit `main` directly.** `dev` exists so mistakes are caught on a
site only the team looks at.

**No terminal needed.** On github.com: switch the branch dropdown to
`dev`, navigate to the folder, and use **Add file → Create new file**
(typing `my-post/post.md` creates the folder) or **Upload files** for
photos. The pencil icon edits an existing file. Committing triggers the
same deploy.

## Photos, once

The site serves images exactly as you upload them — there is no
automatic shrinking. A 7MB photo is a 7MB download for every visitor.

- Resize to about **800px wide** for people (VAs, executives) and
  **1600px wide** for blog and case study covers.
- Aim for **under ~300KB**. Prefer `.jpg`.
- Any image file in the folder is picked up automatically. If there are
  several, the **first one alphabetically wins** — so delete the old
  photo when you replace one, rather than leaving both.

## When something looks wrong

Work through these before asking for help — nearly every problem is one
of them:

| Symptom                                     | Cause                                                     |
| ------------------------------------------- | --------------------------------------------------------- |
| The change isn't showing                    | Give it 2 minutes; check you pushed to `dev`, not a branch of your own |
| It's still not showing                      | The folder name starts with `_`                            |
| Asterisks are visible on the page           | `** spaces inside the stars **` — close them tight          |
| Two paragraphs ran together                 | They need a completely blank line between them              |
| Details show as plain text at the top       | One of the two `---` lines was changed or deleted           |
| The old photo is still there                | Both photos are in the folder; delete the old one           |
| A build failed                              | Repo → **Actions** tab, open the red ✗ run to see why       |

Anything can be undone: open the file on GitHub, click **History**, and
copy back an earlier version.

---

## For developers

Blog and case studies are loaded by `src/lib/content.ts`; talent and
leadership by `src/lib/talent.ts` and `src/lib/leadership.ts`. All four
share the details-block parser in `src/lib/profileFile.ts`, so the
formats stay consistent.

`content/` sits outside `public/` on purpose. Everything under `public/`
is copied verbatim into the deploy, so drafts kept there would be
publicly fetchable at guessable URLs. `scripts/sync-content-images.mjs`
runs from the `prebuild` npm hook and copies only **published** articles'
images into `public/blog/` and `public/case-studies/`, both gitignored.
Talent and leadership have no drafts to protect, so they live under
`public/` directly.

Article bodies are Markdown, rendered by `marked` at build time.

### History

This site previously used Sanity CMS for blog posts and case studies.
In August 2026 all 82 documents — 12 published and 70 drafts that had
never been published — were exported to `content/` folders and Sanity
was removed. The export tool is kept at
`scripts/migrate-sanity-to-content.mjs` as the record of how Portable
Text was converted to Markdown.
