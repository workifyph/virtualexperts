# Gallery — how to add photos

The Gallery page (`/gallery`) builds itself from the folders in this directory.
No code changes needed — just add folders and image files, commit, and deploy.

## Add photos to an existing album

Drop image files (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`) into the
album's folder. They appear in the carousel sorted by filename, so number them:

```
public/gallery/partner-visit/
  01.jpg
  02.jpg
  03.jpg
```

## Add a new album (event)

Create a new folder here. The folder name becomes the album title:

| Folder name              | Shows as                     |
| ------------------------ | ---------------------------- |
| `team-events`            | Team Events                  |
| `2026-christmas-party`   | Christmas Party · 2026       |
| `2026-06-partner-visit`  | Partner Visit · June 2026    |

A `YYYY-` or `YYYY-MM-` prefix is optional and becomes the album's date label.
Albums are listed newest-first (folders sort by name, descending).

An empty folder still shows on the site with "Photo coming soon" placeholder
tiles — keep a `.gitkeep` file inside so git tracks it until photos arrive.

## Tips

- Resize photos to ~1600px wide before committing (keeps the repo and page fast).
- Prefer `.webp` or `.jpg` for photos.
