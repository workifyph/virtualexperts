import fs from "fs";
import path from "path";
import type { GalleryAlbum, GalleryImage } from "@/config/types";

/* ==================================================================
   Gallery loader (build time)
   Albums are plain folders under public/gallery/. To add an event:

     public/gallery/2026-06-partner-visit/
       01.jpg
       02.jpg

   - Folder name becomes the album title ("2026-06-partner-visit"
     -> "Partner Visit", dated "June 2026"). The YYYY or YYYY-MM
     prefix is optional.
   - Images (.jpg .jpeg .png .webp .avif .gif) are sorted by filename.
   - A folder with no images yet still shows as an album with
     placeholder tiles, so events can be scaffolded ahead of photos.
   Runs only at build time — this site is a static export.
   ================================================================== */

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const PLACEHOLDER_COUNT = 4;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function titleCase(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** "2026-06-partner-visit" -> { date: "June 2026", rest: "partner-visit" } */
function parseFolderName(folder: string): { date?: string; rest: string } {
  const yearMonth = folder.match(/^(\d{4})-(0[1-9]|1[0-2])-(.+)$/);
  if (yearMonth) {
    return { date: `${MONTHS[Number(yearMonth[2]) - 1]} ${yearMonth[1]}`, rest: yearMonth[3] };
  }
  const year = folder.match(/^(\d{4})-(.+)$/);
  if (year) {
    return { date: year[1], rest: year[2] };
  }
  return { rest: folder };
}

export function getGalleryAlbums(): GalleryAlbum[] {
  let folders: fs.Dirent[];
  try {
    folders = fs
      .readdirSync(GALLERY_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."));
  } catch {
    return [];
  }

  return folders
    .map((folder) => folder.name)
    // Date-prefixed folders first (newest first), then undated ones A→Z.
    .sort((a, b) => {
      const aDated = /^\d{4}-/.test(a);
      const bDated = /^\d{4}-/.test(b);
      if (aDated !== bDated) return aDated ? -1 : 1;
      return aDated ? b.localeCompare(a) : a.localeCompare(b);
    })
    .map((folder) => {
      const { date, rest } = parseFolderName(folder);
      const title = titleCase(rest);

      const images: GalleryImage[] = fs
        .readdirSync(path.join(GALLERY_DIR, folder))
        .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((file) => ({
          src: `/gallery/${folder}/${file}`,
          alt: `${title} photo`,
        }));

      if (images.length === 0) {
        for (let i = 0; i < PLACEHOLDER_COUNT; i++) {
          images.push({ src: "", alt: `${title} photo coming soon` });
        }
      }

      return { slug: folder, title, date, images };
    });
}
