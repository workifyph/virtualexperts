import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { CaseStudy, CaseStudyListItem } from "./types";

const CS_DIR = path.join(process.cwd(), "content", "case-studies");

function readCaseStudy(file: string): CaseStudy {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    clientIndustry: data.clientIndustry ?? "",
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    image: data.image ?? "",
    imageAlt: data.imageAlt ?? "",
    featured: data.featured === true,
    challenge: data.challenge ?? "",
    solution: data.solution ?? "",
    results: data.results ?? "",
    stats: data.stats ?? [],
    testimonial: data.testimonial || undefined,
    seoTitle: data.seoTitle || undefined,
    seoDescription: data.seoDescription || undefined,
    body: content.trim(),
  };
}

export function getAllCaseStudies(): CaseStudyListItem[] {
  if (!fs.existsSync(CS_DIR)) return [];
  const now = new Date().toISOString();
  return fs
    .readdirSync(CS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readCaseStudy)
    .filter((c) => c.date && c.date <= now)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCaseStudySlugs(): string[] {
  return getAllCaseStudies().map((c) => c.slug);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const file = path.join(CS_DIR, `${slug}.md`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) return null;
  const cs = readCaseStudy(`${slug}.md`);
  if (!cs.date || cs.date > new Date().toISOString()) return null;
  return cs;
}

export function getFeaturedCaseStudies(): CaseStudyListItem[] {
  return getAllCaseStudies().filter((c) => c.featured).slice(0, 3);
}
