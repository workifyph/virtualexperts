import path from "path";
import type { TeamMember } from "@/config/types";
import {
  findPhoto,
  parseParagraphs,
  parseProfileFile,
  readPersonFolders,
  readProfileFile,
  titleCase,
} from "./profileFile";

/* ==================================================================
   Leadership loader (build time)
   The Leadership section on /about is built from folders under
   public/leadership/, exactly like the Talent Pool:

     public/leadership/dulce-chiongson/
       profile.md   ← name, role, order, bio
       photo.jpg    ← any image file in the folder is the portrait

   Swapping an executive's photo means dropping a new image into their
   folder — no code change. Folders starting with "_" or "." are
   skipped (e.g. _example).

   Runs only at build time — this site is a static export.
   See public/leadership/README.md for the admin guide.
   ================================================================== */

const LEADERSHIP_DIR = path.join(process.cwd(), "public", "leadership");

export function getLeadership(): TeamMember[] {
  return readPersonFolders(LEADERSHIP_DIR)
    .map((folder) => {
      const dir = path.join(LEADERSHIP_DIR, folder);
      const { fields, body } = parseProfileFile(readProfileFile(dir));

      const order = Number.parseInt(fields["order"] ?? "", 10);

      return {
        slug: folder,
        name: fields["name"] || titleCase(folder),
        role: fields["role"] || "",
        // Unnumbered people sort after numbered ones.
        order: Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER,
        bio: parseParagraphs(body).join(" "),
        image: findPhoto(dir, `/leadership/${folder}`),
      };
    })
    // `order:` ascending, then A→Z by name for anything unnumbered.
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}
