import type { MetadataRoute } from "next";

const BASE = "https://virtualexperts.ph";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/how-it-works",
    "/industries",
    "/case-studies",
    "/faq",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
