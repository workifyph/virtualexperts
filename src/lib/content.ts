import fs from "fs";
import path from "path";
import { Marked } from "marked";
import type { BlogPost, CaseStudy, CaseStudyStat } from "@/config/types";
import { parseProfileFile, splitList, titleCase } from "./profileFile";

/* ==================================================================
   Blog + case study loader (build time)

   Articles are folders under content/, one folder per article:

     content/blog/my-post/
       post.md      ← details block + the article in Markdown
       cover.jpg    ← the cover image
     content/case-studies/a-client-story/
       case-study.md
       cover.jpg

   content/ sits OUTSIDE public/ on purpose: a folder whose name starts
   with "_" is an unpublished draft, and anything under public/ is
   copied verbatim into the deploy. Keeping drafts here means their text
   and images never reach the web. scripts/sync-content-images.mjs copies
   just the published articles' images into public/ before each build.

   Runs only at build time — this site is a static export.
   See content/README.md for the admin guide.
   ================================================================== */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const CASE_DIR = path.join(process.cwd(), "content", "case-studies");

/** Article folders, skipping "_drafts" and dotfiles. */
function readArticleFolders(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(
        (e) => e.isDirectory() && !e.name.startsWith(".") && !e.name.startsWith("_"),
      )
      .map((e) => e.name);
  } catch {
    return [];
  }
}

function readArticleFile(dir: string, filename: string): string {
  try {
    return fs.readFileSync(path.join(dir, filename), "utf8");
  } catch {
    return "";
  }
}

/* ---------- Markdown ---------------------------------------------- */

const marked = new Marked({ gfm: true, breaks: false });

/**
 * Render an article body to HTML for `.prose-vex`.
 *
 * `publicBase` rewrites bare image filenames (`![alt](cover.jpg)`) to
 * the copy under /public. Images carrying a Markdown title render as a
 * <figure> with a <figcaption>, matching what the Sanity renderer did.
 */
export function renderMarkdown(md: string, publicBase: string): string {
  if (!md.trim()) return "";

  const renderer = new marked.Renderer();

  renderer.image = ({ href, title, text }) => {
    const src = /^(https?:)?\/\//.test(href) ? href : `${publicBase}/${href}`;
    const alt = escapeHtml(text || "");
    const img = `<img src="${escapeHtml(src)}" alt="${alt}" loading="lazy" />`;
    return title
      ? `<figure>${img}<figcaption>${escapeHtml(title)}</figcaption></figure>`
      : `<figure>${img}</figure>`;
  };

  // Open external links in a new tab, as the Portable Text renderer did.
  renderer.link = ({ href, title, tokens }) => {
    const text = marked.Parser.parseInline(tokens, { renderer });
    const external = /^https?:\/\//.test(href);
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    const t = title ? ` title="${escapeHtml(title)}"` : "";
    return `<a href="${escapeHtml(href)}"${t}${attrs}>${text}</a>`;
  };

  return marked.parse(md, { renderer, async: false }) as string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Format a "YYYY-MM-DD" date for display.
 *
 * Built from explicit parts on purpose: `new Date("2026-07-13")` is
 * parsed as UTC midnight, which formats as the 12th anywhere behind
 * UTC. Passing the parts constructs local midnight instead, so the
 * date shown always matches the date written.
 */
export function formatArticleDate(date: string): string {
  const [y, m, d] = (date || "").split("-").map(Number);
  if (!y || !m || !d) return "";
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** First paragraph of the body, as a plain-text fallback for excerpts. */
function firstParagraph(md: string): string {
  const para = md
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith("#") && !p.startsWith("!["));
  if (!para) return "";
  return para.replace(/[*_`>#]|\[([^\]]*)\]\([^)]*\)/g, (_m, label) => label ?? "").trim();
}

/**
 * Split a body into its `## Heading` sections. Used by case studies,
 * where Challenge / Solution / Results are written as sections rather
 * than cramming multi-paragraph prose into the details block.
 */
function splitSections(md: string): { sections: Map<string, string>; rest: string } {
  const sections = new Map<string, string>();
  const lines = md.split("\n");
  const rest: string[] = [];
  let current: string | null = null;
  let buf: string[] = [];

  const flush = () => {
    if (current) sections.set(current.toLowerCase(), buf.join("\n").trim());
    buf = [];
  };

  for (const line of lines) {
    const h = /^##\s+(.+?)\s*$/.exec(line);
    if (h) {
      flush();
      current = h[1];
      continue;
    }
    if (current) buf.push(line);
    else rest.push(line);
  }
  flush();

  return { sections, rest: rest.join("\n").trim() };
}

/* ---------- Blog --------------------------------------------------- */

export function getBlogPosts(): BlogPost[] {
  return readArticleFolders(BLOG_DIR)
    .map((folder) => {
      const dir = path.join(BLOG_DIR, folder);
      const { fields, body } = parseProfileFile(readArticleFile(dir, "post.md"));
      const publicBase = `/blog/${folder}`;

      return {
        slug: folder,
        title: fields["title"] || titleCase(folder),
        excerpt: fields["excerpt"] || firstParagraph(body).slice(0, 200),
        date: fields["date"] || "",
        author: fields["author"] || undefined,
        category: fields["category"] || undefined,
        tags: splitList(fields["tags"]),
        cover: fields["cover"] ? `${publicBase}/${fields["cover"]}` : "",
        coverAlt: fields["cover-alt"] || fields["title"] || "",
        seoTitle: fields["seo-title"] || undefined,
        seoDescription: fields["seo-description"] || undefined,
        bodyHtml: renderMarkdown(body, publicBase),
      };
    })
    // Newest first; undated articles sort last.
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

/* ---------- Case studies ------------------------------------------- */

function parseStats(value: string | undefined): CaseStudyStat[] {
  // "40% = Faster replies | 2x = Capacity"
  return splitList((value ?? "").replace(/\|/g, ","))
    .map((chunk) => {
      const [v, ...rest] = chunk.split("=");
      return { value: (v ?? "").trim(), label: rest.join("=").trim() };
    })
    .filter((s) => s.value && s.label)
    .slice(0, 6);
}

export function getCaseStudies(): CaseStudy[] {
  return readArticleFolders(CASE_DIR)
    .map((folder) => {
      const dir = path.join(CASE_DIR, folder);
      const { fields, body } = parseProfileFile(readArticleFile(dir, "case-study.md"));
      const publicBase = `/case-studies/${folder}`;
      // "## Story" marks where the long-form article begins. Everything
      // after it is passed through untouched, so an editor's own headings
      // render normally; the marker itself never appears on the page.
      const [summaryPart, storyPart] = splitAtStory(body);
      const { sections } = splitSections(summaryPart);

      // These are prose blocks, possibly multi-paragraph, so render them
      // rather than dumping raw Markdown into the summary list.
      const pick = (name: string) => renderMarkdown(sections.get(name) ?? "", publicBase);

      return {
        slug: folder,
        title: fields["title"] || titleCase(folder),
        industry: fields["industry"] || "",
        excerpt: fields["excerpt"] || firstParagraph(body).slice(0, 220),
        date: fields["date"] || "",
        challenge: pick("challenge"),
        solution: pick("solution"),
        results: pick("results"),
        stats: parseStats(fields["stats"]),
        quote: fields["quote"] || undefined,
        quoteAuthor: fields["quote-author"] || undefined,
        quoteRole: fields["quote-role"] || undefined,
        cover: fields["cover"] ? `${publicBase}/${fields["cover"]}` : "",
        coverAlt: fields["cover-alt"] || fields["title"] || "",
        seoTitle: fields["seo-title"] || undefined,
        seoDescription: fields["seo-description"] || undefined,
        bodyHtml: renderMarkdown(storyPart, publicBase),
      };
    })
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((c) => c.slug === slug);
}

/** Split a case study into [summary sections, long-form story]. */
function splitAtStory(md: string): [string, string] {
  const m = /^##\s+story\s*$/im.exec(md);
  if (!m) return [md, ""];
  return [md.slice(0, m.index), md.slice(m.index + m[0].length)];
}
