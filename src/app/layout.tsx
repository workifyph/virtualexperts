import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config";
import { ThemeStyles } from "@/config/ThemeProvider";
import "./globals.css";

const { brand, seo, contact } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: {
    default: `${brand.shortName} — ${brand.tagline}`,
    template: `%s | ${brand.shortName}`,
  },
  description: brand.description,
  keywords: seo.keywords,
  authors: [{ name: brand.name }],
  openGraph: {
    type: "website",
    locale: seo.locale,
    url: seo.url,
    siteName: brand.name,
    title: `${brand.shortName} — ${brand.tagline}`,
    description: brand.description,
    images: [{ url: seo.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.shortName} — ${brand.tagline}`,
    description: brand.description,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: seo.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: seo.url,
    logo: `${seo.url}${brand.logo}`,
    description: brand.description,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: contact.phone,
        contactType: "customer service",
        availableLanguage: ["English"],
      },
    ],
    sameAs: siteConfig.social.map((s) => s.href),
  };

  return (
    <html lang="en">
      <head>
        <ThemeStyles />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--gold)] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
