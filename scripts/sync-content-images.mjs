/**
 * Copy PUBLISHED article images into public/ before a build.
 *
 * Articles live in content/, which is deliberately outside public/ so
 * that drafts (folders starting with "_") never reach the web. Only the
 * images of published articles are copied across:
 *
 *   content/blog/my-post/cover.jpg -> public/blog/my-post/cover.jpg
 *
 * public/blog and public/case-studies are generated and gitignored.
 * Runs automatically via the "prebuild" npm script.
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const PAIRS = [
  { from: path.join(ROOT, "content", "blog"), to: path.join(ROOT, "public", "blog") },
  { from: path.join(ROOT, "content", "case-studies"), to: path.join(ROOT, "public", "case-studies") },
];

let copied = 0;
let skipped = 0;

for (const { from, to } of PAIRS) {
  // Start clean so an unpublished or deleted article can't leave stale
  // images behind in the deploy.
  fs.rmSync(to, { recursive: true, force: true });

  let folders = [];
  try {
    folders = fs
      .readdirSync(from, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith("_") && !e.name.startsWith("."))
      .map((e) => e.name);
  } catch {
    continue; // no such collection yet
  }

  for (const folder of folders) {
    const srcDir = path.join(from, folder);
    const images = fs
      .readdirSync(srcDir)
      .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()));
    if (!images.length) continue;

    const destDir = path.join(to, folder);
    fs.mkdirSync(destDir, { recursive: true });
    for (const img of images) {
      fs.copyFileSync(path.join(srcDir, img), path.join(destDir, img));
      copied++;
    }
  }

  try {
    skipped += fs
      .readdirSync(from, { withFileTypes: true })
      .filter((e) => e.isDirectory() && e.name.startsWith("_")).length;
  } catch {
    /* ignore */
  }
}

console.log(`[content] copied ${copied} published images; skipped ${skipped} draft folders`);
