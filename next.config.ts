import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export cannot run the Next.js image optimizer. We use Sanity's
    // image CDN (urlFor) for sized variants, so disable optimization here.
    unoptimized: true,
  },
};

export default nextConfig;
