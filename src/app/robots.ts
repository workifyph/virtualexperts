import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const isProduction =
  process.env.NEXT_PUBLIC_SITE_URL === "https://virtualexperts.ph";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: ["/"] }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://virtualexperts.ph/sitemap.xml",
  };
}
