/**
 * One-time migration: Sanity -> content/ folders.
 *
 * Exports every post and case study (published AND draft) into
 * content/blog/<slug>/ and content/case-studies/<slug>/, converting
 * Portable Text to Markdown and pulling images down from the Sanity
 * CDN already resized (the originals are 7-8MB PNGs).
 *
 * Drafts become folders whose profile has `published: no`, so they
 * live in git and stay off the site.
 *
 *   node scripts/migrate-sanity-to-content.mjs [--dry]
 */
import fs from "fs";
import path from "path";

const DRY = process.argv.includes("--dry");
const ROOT = process.cwd();
const OUT = { post: path.join(ROOT, "content", "blog"), caseStudy: path.join(ROOT, "content", "case-studies") };

// ---- env -------------------------------------------------------------
const env = Object.fromEntries(
  fs.readFileSync(path.join(ROOT, ".env.local"), "utf8")
    .split("\n").filter(Boolean)
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; }),
);
const PID = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DS = env.NEXT_PUBLIC_SANITY_DATASET;
const VER = env.NEXT_PUBLIC_SANITY_API_VERSION;
const TOK = env.SANITY_API_READ_TOKEN;

async function groq(query) {
  const url = `https://${PID}.api.sanity.io/v${VER}/data/query/${DS}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${TOK}` } });
  if (!res.ok) throw new Error(`GROQ ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.error) throw new Error(JSON.stringify(json.error));
  return json.result;
}

// ---- Sanity image ref -> CDN url -------------------------------------
// ref looks like: image-<assetId>-<w>x<h>-<ext>
function refToUrl(ref, { width = 1600, quality = 80 } = {}) {
  const m = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/.exec(ref);
  if (!m) return null;
  const [, id, dims, ext] = m;
  return `https://cdn.sanity.io/images/${PID}/${DS}/${id}-${dims}.${ext}?w=${width}&fm=jpg&q=${quality}&fit=max`;
}

async function downloadImage(ref, destDir, basename) {
  const url = refToUrl(ref);
  if (!url) return null;
  const res = await fetch(url);
  if (!res.ok) { console.warn(`  ! image ${res.status} for ${basename}`); return null; }
  const buf = Buffer.from(await res.arrayBuffer());
  const file = `${basename}.jpg`;
  if (!DRY) fs.writeFileSync(path.join(destDir, file), buf);
  return { file, kb: Math.round(buf.length / 1024) };
}

// ---- Portable Text -> Markdown ---------------------------------------
function escapeMd(text) {
  // Only escape what would otherwise become markup at the start of a line
  // or inside emphasis. Content is prose, so keep this light.
  return text.replace(/([*_`])/g, "\\$1");
}

function spansToMd(block) {
  const defs = Object.fromEntries((block.markDefs || []).map((d) => [d._key, d]));
  return (block.children || [])
    .map((child) => {
      if (child._type !== "span") return "";
      const raw = child.text ?? "";
      if (!raw) return "";

      // Emphasis markers must hug the text: "**bold** " parses, "**bold **"
      // does not. Sanity spans routinely carry the trailing space inside
      // the mark, so lift surrounding whitespace outside the markers.
      const [, lead, core, trail] = /^(\s*)([\s\S]*?)(\s*)$/.exec(raw);
      if (!core) return raw;

      let text = escapeMd(core);
      const marks = child.marks || [];
      // Decorators innermost, link outermost, so the link wraps the styling.
      if (marks.includes("code")) text = `\`${text}\``;
      if (marks.includes("strong")) text = `**${text}**`;
      if (marks.includes("em")) text = `*${text}*`;
      for (const mark of marks) {
        const def = defs[mark];
        if (def && def._type === "link" && def.href) text = `[${text}](${def.href})`;
      }
      return lead + text + trail;
    })
    .join("");
}

function portableTextToMarkdown(blocks, images) {
  const out = [];
  let listCounter = 0;

  for (const block of blocks || []) {
    if (block._type === "image") {
      const img = images.get(block._key);
      if (img) {
        const alt = (block.alt || "").replace(/"/g, "'");
        const caption = (block.caption || "").replace(/"/g, "'");
        out.push(caption ? `![${alt}](${img.file} "${caption}")` : `![${alt}](${img.file})`);
      }
      listCounter = 0;
      continue;
    }
    if (block._type !== "block") continue;

    const text = spansToMd(block);
    if (!text.trim()) { listCounter = 0; continue; }

    const indent = "  ".repeat(Math.max(0, (block.level || 1) - 1));

    if (block.listItem === "bullet") {
      out.push(`${indent}- ${text}`);
      continue;
    }
    if (block.listItem === "number") {
      listCounter += 1;
      out.push(`${indent}${listCounter}. ${text}`);
      continue;
    }
    listCounter = 0;

    switch (block.style) {
      case "h2": out.push(`## ${text}`); break;
      case "h3": out.push(`### ${text}`); break;
      case "h4": out.push(`#### ${text}`); break;
      case "blockquote": out.push(`> ${text}`); break;
      default: out.push(text);
    }
  }

  // Join, keeping consecutive list items tight and everything else
  // separated by a blank line.
  let md = "";
  for (let i = 0; i < out.length; i++) {
    const line = out[i];
    const prev = out[i - 1];
    const bothList = prev !== undefined && /^\s*([-]|\d+\.)\s/.test(prev) && /^\s*([-]|\d+\.)\s/.test(line);
    md += (i === 0 ? "" : bothList ? "\n" : "\n\n") + line;
  }
  return md.trim();
}

// ---- frontmatter -----------------------------------------------------
function fm(pairs) {
  const lines = pairs
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(([k, v]) => `${k}: ${String(v).replace(/\r?\n/g, " ").trim()}`);
  return `---\n${lines.join("\n")}\n---\n`;
}

function slugify(s) {
  return String(s || "").toLowerCase().replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

// ---- main ------------------------------------------------------------
const POST_Q = `*[_type == "post"]{
  _id, _type, title, "slug": slug.current, excerpt, publishedAt, tags,
  featuredImage, "author": author->name, "category": category->title,
  body, seoTitle, seoDescription
}`;
const CASE_Q = `*[_type == "caseStudy"]{
  _id, _type, title, "slug": slug.current, clientIndustry, excerpt,
  challenge, solution, results, stats, testimonial, publishedAt, featured,
  featuredImage, body, seoTitle, seoDescription
}`;

function collectBodyImages(body) {
  return (body || []).filter((b) => b._type === "image" && b.asset?._ref);
}

async function writeDoc(doc, dir) {
  const isDraft = doc._id.startsWith("drafts.");
  const slug = doc.slug || slugify(doc.title) || doc._id.replace(/^drafts\./, "");
  const folder = path.join(dir, (isDraft ? "_" : "") + slug);
  if (!DRY) fs.mkdirSync(folder, { recursive: true });

  // images
  let cover = null;
  if (doc.featuredImage?.asset?._ref) {
    cover = await downloadImage(doc.featuredImage.asset._ref, folder, "cover");
  }
  const bodyImgs = collectBodyImages(doc.body);
  const imageMap = new Map();
  for (let i = 0; i < bodyImgs.length; i++) {
    const b = bodyImgs[i];
    const got = await downloadImage(b.asset._ref, folder, `image-${i + 1}`);
    if (got) imageMap.set(b._key, got);
  }

  const md = portableTextToMarkdown(doc.body, imageMap);
  const date = (doc.publishedAt || "").slice(0, 10);

  let head;
  if (doc._type === "post") {
    head = fm([
      ["title", doc.title],
      ["published", isDraft ? "no" : "yes"],
      ["date", date],
      ["author", doc.author],
      ["category", doc.category],
      ["tags", (doc.tags || []).join(", ")],
      ["excerpt", doc.excerpt],
      ["cover", cover?.file],
      ["cover-alt", doc.featuredImage?.alt],
      ["seo-title", doc.seoTitle],
      ["seo-description", doc.seoDescription],
    ]);
  } else {
    const stats = (doc.stats || [])
      .filter((s) => s?.value && s?.label)
      .map((s) => `${s.value} = ${s.label}`).join(" | ");
    head = fm([
      ["title", doc.title],
      ["published", isDraft ? "no" : "yes"],
      ["date", date],
      ["industry", doc.clientIndustry],
      ["excerpt", doc.excerpt],
      ["cover", cover?.file],
      ["cover-alt", doc.featuredImage?.alt],
      ["stats", stats],
      ["quote", doc.testimonial?.quote],
      ["quote-author", doc.testimonial?.author],
      ["quote-role", doc.testimonial?.role],
      ["seo-title", doc.seoTitle],
      ["seo-description", doc.seoDescription],
    ]);
  }

  let bodyOut;
  if (doc._type === "caseStudy") {
    const section = (t, v) => (v && String(v).trim() ? `## ${t}\n\n${String(v).trim()}\n\n` : "");
    bodyOut =
      section("Challenge", doc.challenge) +
      section("Solution", doc.solution) +
      section("Results", doc.results) +
      (md ? `## Story\n\n${md}\n` : "");
  } else {
    bodyOut = md ? `${md}\n` : "";
  }

  const file = path.join(folder, doc._type === "post" ? "post.md" : "case-study.md");
  if (!DRY) fs.writeFileSync(file, `${head}\n${bodyOut}`);

  const imgKb = (cover?.kb || 0) + [...imageMap.values()].reduce((s, i) => s + i.kb, 0);
  return { folder: path.basename(folder), isDraft, imgs: (cover ? 1 : 0) + imageMap.size, imgKb };
}

const [posts, cases] = await Promise.all([groq(POST_Q), groq(CASE_Q)]);

// A draft that also exists published would overwrite the published copy.
// Keep the published version and skip its draft twin.
const publishedIds = new Set(posts.concat(cases).filter((d) => !d._id.startsWith("drafts.")).map((d) => d._id));
const all = posts.concat(cases).filter((d) => {
  if (!d._id.startsWith("drafts.")) return true;
  return !publishedIds.has(d._id.replace(/^drafts\./, ""));
});

console.log(`Exporting ${all.length} docs (${all.filter(d=>!d._id.startsWith("drafts.")).length} published, ${all.filter(d=>d._id.startsWith("drafts.")).length} drafts)${DRY ? " [DRY RUN]" : ""}\n`);

let totalKb = 0, totalImgs = 0;
for (const doc of all) {
  const r = await writeDoc(doc, OUT[doc._type]);
  totalKb += r.imgKb; totalImgs += r.imgs;
  console.log(`  ${r.isDraft ? "draft " : "LIVE  "} ${r.folder.padEnd(60).slice(0, 60)} ${String(r.imgs).padStart(2)} img ${String(r.imgKb).padStart(5)}KB`);
}
console.log(`\nDone. ${totalImgs} images, ${(totalKb / 1024).toFixed(1)} MB total.`);
