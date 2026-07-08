import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostListItem } from "./types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    author: data.author ?? "",
    category: data.category ?? "",
    tags: data.tags ?? [],
    image: data.image ?? "",
    imageAlt: data.imageAlt ?? "",
    seoTitle: data.seoTitle || undefined,
    seoDescription: data.seoDescription || undefined,
    body: content.trim(),
  };
}

/**
 * All posts whose date has passed, newest first. Future-dated posts are
 * excluded at build time — they go live on the first build after their date.
 */
export function getAllPosts(): PostListItem[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const now = new Date().toISOString();
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .filter((p) => p.date && p.date <= now)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) return null;
  const post = readPost(`${slug}.md`);
  if (!post.date || post.date > new Date().toISOString()) return null;
  return post;
}
