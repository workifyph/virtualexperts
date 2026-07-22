# Gallery — how to manage albums and photos

The Gallery page (https://virtualexperts.ph/gallery) builds itself from the
folders in this directory (`public/gallery/`). **No code changes are ever
needed** — you only rename folders and add/remove image files, then push.

```
public/gallery/
  2025-REPS-visit/   ← one folder = one album (tab on the page)
    1.jpg            ← photos, shown in filename order
    2.jpg
    3.jpg
  community/
  team-events/
```

---

## 1. Renaming an album (changes the tab title)

The folder name **is** the tab title. Rename the folder, and the tab renames
itself on the next deploy.

**Naming rules:**

| You name the folder…      | The tab shows…              |
| ------------------------- | --------------------------- |
| `team-events`             | Team Events                 |
| `community-outreach`      | Community Outreach          |
| `2026-christmas-party`    | Christmas Party · 2026      |
| `2026-06-partner-visit`   | Partner Visit · June 2026   |
| `2025-REPS-visit`         | REPS Visit · 2025           |

- Use dashes (`-`) instead of spaces. Each word is capitalized automatically.
- ALL-CAPS words (like `REPS`) stay all-caps.
- A `YYYY-` or `YYYY-MM-` prefix at the start is **optional** — it is removed
  from the title and shown as the album's date label instead.
- Albums with a year prefix are listed **newest first**; folders without a
  year come after, A→Z.

**How to rename (Terminal):**

```bash
cd public/gallery
git mv 2025-REPS-visit 2025-11-REPS-visit   # example: add the month
```

**How to rename (Finder / GitHub web):** just rename the folder normally —
on GitHub's website you can open the folder, click a file, and edit its path.

⚠️ Don't put characters other than letters, numbers, and dashes in the folder
name (`&`, `'`, `#` etc. will end up ugly or break the URL).

---

## 2. Adding, replacing, or removing photos

**Accepted formats:** `.jpg` `.jpeg` `.png` `.webp` `.avif` `.gif`

**Order:** photos appear in the carousel sorted by filename (numeric-aware,
so `2.jpg` comes before `10.jpg`). Number them in the order you want:

```
public/gallery/2025-REPS-visit/
  1.jpg    ← shown first
  2.jpg
  3.jpg
```

- **Add:** drop new files into the album folder. To insert one between
  existing photos, renumber (e.g. rename `2.jpg` → `3.jpg`, add new `2.jpg`).
- **Replace:** overwrite the file, keeping the same name.
- **Remove:** delete the file.
- **New album:** create a new folder (see naming rules above) and put photos
  in it. An empty folder still shows on the page with "Photo coming soon"
  placeholder tiles — keep a `.gitkeep` file inside so git tracks it until
  photos arrive.
- **Delete an album:** delete the whole folder.

**Photo prep (please do this before committing):**

- Resize to **~1600px wide** — keeps the repo small and the page fast.
- Prefer `.jpg` or `.webp`. Aim for **under ~500KB per photo**.
- Photos display cropped to a 16:9 frame — landscape photos look best.

---

## 3. Publishing your changes

Changes go live only after they are pushed and deployed:

```bash
git checkout dev
git pull
# …rename folders / add photos…
git add public/gallery
git commit -m "Update gallery photos"
git push origin dev
```

- Pushing to **`dev`** auto-deploys in ~2 minutes to
  **https://dev.virtualexperts.ph/gallery** — check your changes there first.
- To publish to the **live site** (virtualexperts.ph), open a pull request
  from `dev` → `main` on GitHub and merge it. Prod deploys automatically
  from `main`.

**No terminal?** You can do everything on GitHub's website: open the repo on
the `dev` branch, navigate to `public/gallery/`, and use **Add file →
Upload files** (or rename/delete via the file menus). Committing there
triggers the same auto-deploy.
