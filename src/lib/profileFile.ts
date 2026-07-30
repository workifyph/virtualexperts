import fs from "fs";
import path from "path";

/* ==================================================================
   Shared "content as folders" helpers (build time only)

   Both the Talent Pool (public/talent/) and Leadership
   (public/leadership/) are edited as folders rather than code: one
   folder per person, holding a profile.md and a photo. This module
   holds the bits both loaders need so the two stay in step — an
   editor who learns one format has learned the other.

   Runs only at build time; this site is a static export.
   ================================================================== */

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export function titleCase(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** "a, b , c" -> ["a", "b", "c"]; blank/missing -> []. */
export function splitList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Parse a `--- key: value ---` header + body from profile.md. */
export function parseProfileFile(raw: string): {
  fields: Record<string, string>;
  body: string;
} {
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

/** Split a bio body into paragraphs on blank lines. */
export function parseParagraphs(body: string): string[] {
  if (!body) return [];
  return body.split(/\n\s*\n/).map((p) => p.replace(/\n/g, " ").trim());
}

/**
 * Person folders inside a content directory, skipping "_example" and
 * dotfiles. Returns [] when the directory is missing so a build never
 * fails on absent content.
 */
export function readPersonFolders(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          !entry.name.startsWith(".") &&
          !entry.name.startsWith("_"),
      )
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

/** Read profile.md, tolerating a folder that doesn't have one yet. */
export function readProfileFile(dir: string): string {
  try {
    return fs.readFileSync(path.join(dir, "profile.md"), "utf8");
  } catch {
    // Half-finished profile — still show it so the dev site reveals
    // the folder exists.
    return "";
  }
}

/**
 * First image in the folder, alphabetically (numeric-aware).
 * Returns "" when there is no photo yet.
 */
export function findPhoto(dir: string, publicPath: string): string {
  const file = fs
    .readdirSync(dir)
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))[0];

  return file ? `${publicPath}/${file}` : "";
}
