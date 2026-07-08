import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content/posts";
import { getAllCaseStudies } from "@/lib/content/caseStudies";

export const dynamic = "force-static";

const BASE = "https://virtualexperts.ph";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/how-it-works",
    "/industries",
    "/case-studies",
    "/blog",
    "/faq",
    "/contact",
  ];

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const cases: MetadataRoute.Sitemap = getAllCaseStudies().map((cs) => ({
    url: `${BASE}/case-studies/${cs.slug}`,
    lastModified: new Date(cs.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts, ...cases];
}
