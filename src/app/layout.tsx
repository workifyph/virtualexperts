import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { businessProfile } from "@/content/siteData";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(businessProfile.siteUrl),
  title: {
    default: `${businessProfile.shortName} — ${businessProfile.tagline}`,
    template: `%s | ${businessProfile.shortName}`,
  },
  description: businessProfile.description,
  keywords: [
    "virtual assistants Philippines",
    "remote staffing",
    "outsourcing Philippines",
    "BPO services",
    "customer support outsourcing",
    "virtual assistant company",
    "managed remote teams",
    "Filipino virtual assistants",
    "back office support",
    "on-call VA support",
  ],
  authors: [{ name: businessProfile.legalName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: businessProfile.siteUrl,
    siteName: businessProfile.legalName,
    title: `${businessProfile.shortName} — ${businessProfile.tagline}`,
    description: businessProfile.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${businessProfile.shortName} — ${businessProfile.tagline}`,
    description: businessProfile.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: businessProfile.siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessProfile.legalName,
    url: businessProfile.siteUrl,
    logo: `${businessProfile.siteUrl}/vex_logo.png`,
    description: businessProfile.description,
    foundingDate: businessProfile.established,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Susana Bldg 6, E. Nietes St, Funda Dalipe",
      addressLocality: "San Jose",
      addressRegion: "Antique",
      postalCode: "5700",
      addressCountry: "PH",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: businessProfile.primaryPhone,
        contactType: "customer service",
        availableLanguage: ["English", "Filipino"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/VirtualExpertsPH",
      "https://www.linkedin.com/company/virtual-experts-philippines",
      "https://www.instagram.com/virtualexpertsphilippines",
      "https://youtube.com/@virtualexpertsphilippines",
      "https://www.tiktok.com/@virtualexperts.ph",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
