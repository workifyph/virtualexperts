import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export cannot run the Next.js image optimizer. Blog images are
    // pre-sized WebP files committed under public/blog/.
    unoptimized: true,
  },
};

export default nextConfig;
