# Blog Authoring Guide — Virtual Experts

**Audience:** content editors / VAs. Everything happens in your browser on
github.com — no terminal, no code knowledge needed beyond simple markdown.

Blog posts are **markdown files in this repository** under `content/blog/`.
Each file is one post. Committing a change to the `dev` branch automatically
rebuilds and publishes the dev site within a few minutes.

---

## What you need (one-time setup)

1. A **GitHub account** with write access to
   `github.com/workifyph/virtualexperts` (ask the admin for an invite).
2. Bookmark the blog folder:
   **<https://github.com/workifyph/virtualexperts/tree/dev/content/blog>**

---

## Add a new blog post

1. Open the blog folder link above. Make sure the branch selector (top left)
   says **`dev`**.
2. Click **Add file → Create new file**.
3. Name the file after the post's URL, all lowercase with hyphens, ending in
   `.md`. Example: `how-to-delegate-your-inbox.md` becomes
   `virtualexperts.ph/blog/how-to-delegate-your-inbox`.
4. Paste this template and fill it in:

   ```markdown
   ---
   title: "Your Post Title"
   date: "2026-07-15T08:00:00Z"
   author: "Dulce Chiongson"
   category: "Operations"
   tags: ["operations", "delegation"]
   excerpt: "One or two sentences shown on the blog index page."
   image: "/blog/how-to-delegate-your-inbox.webp"
   imageAlt: "Describe the cover image in words (for accessibility)."
   ---

   Your article starts here. Blank line between paragraphs.

   ## Section headings use two hash marks

   **Bold** with double asterisks, *italic* with single. Links look like
   [this](https://example.com).

   - Bullet lists use dashes
   1. Numbered lists use numbers

   ![Describe this image](/blog/how-to-delegate-your-inbox-1.webp "Optional caption")
   ```

5. **Cover image:** every post needs one. Upload it first (see next section),
   then reference it in the `image:` line.
6. Scroll down, write a short commit message (e.g. `Add post: how to delegate
   your inbox`), make sure **"Commit directly to the dev branch"** is
   selected, and click **Commit changes**.
7. **Wait 3–5 minutes**, then check
   **<https://dev.virtualexperts.ph/blog>** — your post is live on dev.

### The date field controls when a post appears

Posts with a **future date are hidden** until that date passes — the site
rebuilds itself every morning and picks up newly-due posts automatically.
This is how the weekly schedule works: write posts ahead of time, date them
one week apart, and they publish themselves.

To publish immediately, use today's date (or any past date).

---

## Upload an image

1. Go to **<https://github.com/workifyph/virtualexperts/tree/dev/public/blog>**
   (branch: `dev`).
2. Click **Add file → Upload files**, drag your image in, and commit to `dev`.
3. Reference it in your post as `/blog/your-file-name.webp` (the path is the
   part after `public`).

Keep images web-sized — under ~500 KB each. Prefer `.webp` or `.jpg`.

---

## Edit an existing post

1. Open the post's file in
   [`content/blog/`](https://github.com/workifyph/virtualexperts/tree/dev/content/blog)
   (branch: `dev`).
2. Click the **pencil icon** (top right of the file view).
3. Make your changes, commit to `dev`.
4. Wait 3–5 minutes, refresh the dev site.

## Undo a mistake

Every change is a git commit, so nothing is ever lost. Open the file → click
**History** (top right) → open the last good version → copy its contents →
edit the file and paste them back. Or ask the admin to revert the commit.

---

## How posts reach the real website (prod)

- Publishing to **dev** is automatic (commit → rebuild).
- **virtualexperts.ph** (prod) rebuilds when the admin merges `dev → main`
  (or re-runs the "Deploy prod" workflow) and approves the deployment.
  A weekly scheduled prod rebuild (Tue 6am PH) also picks up newly-due
  posts — the admin just approves it.

So the routine is: commit posts to `dev` → check them on
`dev.virtualexperts.ph` → the admin approves the weekly prod deploy.

---

## Troubleshooting

**My post isn't on dev after 10 minutes.**
Check the deploy runs at
<https://github.com/workifyph/virtualexperts/actions> — a red ❌ on
"Deploy dev" usually means a typo in the frontmatter (the `---` block). Most
common: a missing closing quote, or a missing `---` line. Fix and re-commit.

**My post is missing but the build is green.**
Check the `date:` — if it's in the future, the post is intentionally hidden
until that date.

**The post looks wrong (formatting).**
Check the markdown: headings need a blank line before them, images need the
`![alt](/blog/file.webp)` shape exactly.
