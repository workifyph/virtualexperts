# Content — how to manage blog posts and case studies

Blog posts and case studies are folders in this directory. **No code
changes are ever needed** — you edit a text file and an image, then push.
This is the same format as `public/talent/` and `public/leadership/`, so
if you have added a VA before, this will look familiar.

```
content/
  blog/
    why-hiring-a-va-works/     ← one folder = one article
      post.md                  ← the details + the article itself
      cover.jpg                ← the cover image
    _my-half-finished-idea/    ← starts with "_" = DRAFT, never on the site
  case-studies/
    scaling-operations/
      case-study.md
      cover.jpg
```

The folder name becomes the web address:
`why-hiring-a-va-works` → `virtualexperts.ph/blog/why-hiring-a-va-works`.
Use only lowercase letters, numbers, and dashes.

> **Why this folder isn't `public/`.** Everything inside `public/` is
> copied onto the live web server. Drafts live here in `content/` so that
> unpublished writing — and its images — never reach the internet. The
> build copies just the published articles' images across for you.

**Contents**

1. [Publishing and unpublishing](#1-publishing-and-unpublishing)
2. [Writing a blog post](#2-writing-a-blog-post)
3. [Formatting the article](#3-formatting-the-article)
4. [Adding images inside an article](#4-adding-images-inside-an-article)
5. [Writing a case study](#5-writing-a-case-study)
6. [Image prep](#6-image-prep)
7. [Publishing your changes](#7-publishing-your-changes)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Publishing and unpublishing

**The underscore is the switch.** A folder starting with `_` is a draft:

```
content/blog/_my-new-idea/     ← draft. Not on the site. Safe to leave for months.
content/blog/my-new-idea/      ← live. Remove the underscore to publish.
```

To publish, rename the folder to drop the `_`. To pull an article back
down, put the `_` back. That's the whole system — nothing else to click.

There is also a `published: yes` line inside `post.md`. It records what
the article's status was when it came over from the old CMS. **The folder
name is what actually decides** — if the two disagree, the folder wins.

## 2. Writing a blog post

1. Copy an existing folder, or make a new one named for the article.
2. Name it with a leading `_` while you work on it.
3. Inside, create `post.md`:

```
---
title: Why Hiring a VA Works
date: 2026-08-03
author: Dulce Chiongson
category: Hiring a VA
excerpt: A short summary shown on the blog index and in Google results.
cover: cover.jpg
cover-alt: A description of the photo, for screen readers.
seo-title: An optional shorter title just for Google
seo-description: An optional summary just for Google.
---

The article itself starts here, after the second --- line.
```

4. Drop `cover.jpg` in the same folder.
5. Rename the folder to remove the `_` when you're ready to publish.

| Field             | Required? | What it does                                            |
| ----------------- | --------- | ------------------------------------------------------- |
| `title`           | yes       | The headline                                            |
| `date`            | yes       | `YYYY-MM-DD`. Newest articles appear first              |
| `author`          | no        | Shown as "By …" under the headline                      |
| `category`        | no        | The small gold label on the card. Falls back to the date |
| `excerpt`         | no        | Card summary. Falls back to your first paragraph        |
| `cover`           | no        | Filename of the cover image in this folder               |
| `cover-alt`       | no        | Describes the image for screen readers                   |
| `tags`            | no        | Comma-separated. Recorded but not shown on the site yet  |
| `seo-title`       | no        | Overrides `title` for Google and social shares           |
| `seo-description` | no        | Overrides `excerpt` for Google and social shares         |

Keep the two `---` lines exactly as they are.

## 3. Formatting the article

Everything after the second `---` is written in **Markdown**:

```
## A section heading

A normal paragraph. Put a blank line between paragraphs.

**Bold text** and *italic text*.

- A bullet
- Another bullet

1. A numbered step
2. The next step

> A pull quote.

[A link to somewhere](https://example.com)
```

Notes:

- Start headings at `##`. The article's main title comes from `title:`,
  so a single `#` would produce a second page heading.
- Blank lines matter. Two paragraphs with no blank line between them
  become one paragraph.
- Keep the `**` tight against the words: `**like this**`, not
  `** like this **` — the second one shows the asterisks on the page.

## 4. Adding images inside an article

Put the image file in the article's folder, then reference it by
filename:

```
![A description for screen readers](chart.jpg)
```

To add a caption underneath, put it in quotes after the filename:

```
![A description for screen readers](chart.jpg "Response times before and after")
```

Use just the filename — no folders, no slashes.

## 5. Writing a case study

Same idea, but the file is `case-study.md` and the article is written as
named sections:

```
---
title: Scaling Operations Through a Managed Offshore Workforce
date: 2026-07-23
industry: Professional Services
excerpt: A short summary for the index card.
cover: cover.jpg
cover-alt: A description of the photo.
stats: 40% = Faster response | 2x = Support capacity | 12 hrs = Saved weekly
quote: They rebuilt our support operation in a quarter.
quote-author: Jane Smith
quote-role: COO, Acme Corp
---

## Challenge

What the client was struggling with.

## Solution

What we did about it.

## Results

What changed.

## Story

Anything after "## Story" is the long-form article. Write it exactly
like a blog post — your own `##` headings, images, and lists all work
normally here.
```

- **`## Challenge`, `## Solution`, `## Results`** fill the summary box
  near the top. All three are expected; each can be several paragraphs.
- **`## Story`** is a marker, not a heading — the words "Story" never
  appear on the page. Everything below it becomes the long article.
  Leave the whole section out if you don't want a long version.
- **`stats`** are the big numbers. Format is `VALUE = LABEL`, separated
  by `|`. Up to 6; leave the line out for none.
- **`quote` / `quote-author` / `quote-role`** are the testimonial. Leave
  `quote` out and the whole block disappears.

## 6. Image prep

- Cover images are shown wide — around **1600px wide** is right.
- Aim for **under ~300KB** each, and prefer `.jpg`.
- The site serves these images exactly as you upload them, with no
  automatic shrinking. A 7MB image makes the page slow for everyone.

## 7. Publishing your changes

```bash
git checkout dev
git pull
# …add or edit article folders…
git add content
git commit -m "Add new blog post"
git push origin dev
```

- Pushing to **`dev`** auto-deploys in ~2 minutes to
  **https://dev.virtualexperts.ph/blog** — check it there first.
- To publish to the **live site**, open a pull request from `dev` →
  `main` on GitHub and merge it.

**No terminal?** Do it all on github.com: switch the branch dropdown to
`dev`, navigate to `content/blog/`, and use **Add file → Create new
file** (type `my-post/post.md` to create the folder) or **Upload files**
for images.

## 8. Troubleshooting

**My article isn't showing.** Check the folder name doesn't start with
`_`. Then allow ~2 minutes for the rebuild and confirm you pushed to the
right branch.

**The asterisks are showing on the page.** There's a space inside them —
`** like this **`. Close them tight against the words.

**Two paragraphs ran together.** They need a completely blank line
between them, not just a line break.

**The date is wrong or the article is in the wrong order.** `date:` must
be `YYYY-MM-DD`. Articles sort newest first.

**The whole article looks broken / the details show as plain text.** One
of the two `---` lines was changed or deleted. There must be exactly one
`---` on the first line and one on its own line after the last detail.

**An image isn't showing.** Check the file is in the same folder as the
`.md` file and that the filename matches exactly, including capital
letters. Only published articles get their images copied to the site —
a draft's images won't load until you publish it.

**My case study's summary box is empty.** The headings must be exactly
`## Challenge`, `## Solution`, and `## Results`.

**I want to undo something.** Every change is in the repo's history.
Open the file on GitHub, click **History**, and copy back the earlier
version. Nothing is ever really lost.
