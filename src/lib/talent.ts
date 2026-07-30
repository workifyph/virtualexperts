import fs from "fs";
import path from "path";
import type { TalentCategory, TalentProfile } from "@/config/types";
import {
  TALENT_CATEGORIES,
  orderTalentCategories,
  resolveCategory,
} from "@/config/talentCategories";

/* ==================================================================
   Talent loader (build time)
   VA profiles are plain folders under public/talent/. To add a VA:

     public/talent/maria-santos/
       profile.md   ← details (name, role, available, skills, bio…)
       photo.jpg    ← any image file in the folder is the portrait

   - profile.md starts with a `---` block of `key: value` lines;
     everything after the closing `---` is the bio.
   - `available: no` marks the VA as currently placed (profile stays
     visible, hire form is replaced with a contact prompt).
   - `category:` puts the VA behind one of the buttons at the top of
     /talent. Missing or unrecognised values are resolved in
     src/config/talentCategories.ts — nobody ever falls off the page.
   - Folders starting with "_" or "." are skipped (e.g. _example).
   Runs only at build time — this site is a static export.
   See public/talent/README.md for the admin guide.
   ================================================================== */

const TALENT_DIR = path.join(process.cwd(), "public", "talent");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function titleCase(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function splitList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Parse a `--- key: value ---` header + body from profile.md. */
function parseProfileFile(raw: string): { fields: Record<string, string>; body: string } {
  const fields: Record<string, string> = {};
  const normalized = raw.replace(/\r\n/g, "\n").trim();

  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const header = match ? match[1] : "";
  const body = match ? match[2] : normalized;

  for (const line of header.split("\n")) {
    const kv = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (kv) fields[kv[1].toLowerCase()] = kv[2].trim();
  }

  return { fields, body: body.trim() };
}

export function getTalentProfiles(): TalentProfile[] {
  let folders: fs.Dirent[];
  try {
    folders = fs
      .readdirSync(TALENT_DIR, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          !entry.name.startsWith(".") &&
          !entry.name.startsWith("_"),
      );
  } catch {
    return [];
  }

  return folders
    .map((folder) => folder.name)
    .map((folder) => {
      const dir = path.join(TALENT_DIR, folder);

      let raw = "";
      try {
        raw = fs.readFileSync(path.join(dir, "profile.md"), "utf8");
      } catch {
        // No profile.md yet — still show the folder with defaults so
        // a half-finished profile is visible on the dev site.
      }
      const { fields, body } = parseProfileFile(raw);

      const photoFile = fs
        .readdirSync(dir)
        .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))[0];

      const availableRaw = (fields["available"] ?? "yes").toLowerCase();
      const role = fields["role"] || "Virtual Assistant";
      const category = resolveCategory(fields["category"], role);

      return {
        slug: folder,
        name: fields["name"] || titleCase(folder),
        role,
        available: !["no", "false", "unavailable", "hired"].includes(availableRaw),
        category: category.slug,
        categoryTitle: category.title,
        specialization: fields["specialization"] || undefined,
        experience: fields["experience"] || undefined,
        location: fields["location"] || undefined,
        skills: splitList(fields["skills"]),
        tools: splitList(fields["tools"]),
        languages: splitList(fields["languages"]),
        bio: body ? body.split(/\n\s*\n/).map((p) => p.replace(/\n/g, " ").trim()) : [],
        photo: photoFile ? `/talent/${folder}/${photoFile}` : "",
      };
    })
    // Available VAs first, then A→Z by name within each group.
    .sort((a, b) => {
      if (a.available !== b.available) return a.available ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}

export function getTalentProfile(slug: string): TalentProfile | undefined {
  return getTalentProfiles().find((profile) => profile.slug === slug);
}

/**
 * The category buttons for /talent — only the categories that have at
 * least one VA in them, each with a head count. An editor adding the
 * first VA to a category makes its button appear; removing the last
 * one makes it disappear. No code change either way.
 */
export function getTalentCategories(
  profiles: TalentProfile[],
): (TalentCategory & { count: number })[] {
  const counts = new Map<string, number>();
  const found: TalentCategory[] = [];

  for (const profile of profiles) {
    counts.set(profile.category, (counts.get(profile.category) ?? 0) + 1);
    // Known categories keep their tagline/icon; editor-invented ones
    // fall back to the label typed in profile.md.
    found.push(
      TALENT_CATEGORIES.find((category) => category.slug === profile.category) ?? {
        slug: profile.category,
        title: profile.categoryTitle,
        tagline: "",
        icon: "⭐",
        keywords: [],
      },
    );
  }

  return orderTalentCategories(found).map((category) => ({
    ...category,
    count: counts.get(category.slug) ?? 0,
  }));
}
