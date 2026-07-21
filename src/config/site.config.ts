import type { SiteConfig } from "./types";
import { warmGold } from "./themes";

/* ══════════════════════════════════════════════════════════════
   Site Configuration
   Edit this file to customize your site's identity, navigation,
   contact info, and SEO settings.
   ══════════════════════════════════════════════════════════════ */

export const theme = warmGold;

export const siteConfig: SiteConfig = {
  brand: {
    name: "Virtual Experts Philippines OPC",
    shortName: "VEX",
    logo: "/vex_logo.png",
    tagline: "Remote support teams for service-led businesses",
    description:
      "Your trusted global outsourcing partner delivering skilled talent, structured systems, and scalable solutions.",
  },

  contact: {
    email: "contact@virtualexperts.ph",
    phone: "+1 (818) 381-0070",
    whatsappLink: "https://wa.me/639171092591",
    address: "Susana Bldg 6, E. Nietes St, Funda Dalipe, San Jose, Antique 5700",
    hours: "9:00 PM to 9:00 AM Philippine Time",
    hoursContext: "Aligned with US business hours",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],

  social: [
    { label: "Facebook", href: "https://www.facebook.com/VirtualExpertsPH", icon: "facebook" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/virtual-experts-philippines", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/virtualexpertsphilippines", icon: "instagram" },
    { label: "YouTube", href: "https://youtube.com/@virtualexpertsphilippines", icon: "youtube" },
    { label: "TikTok", href: "https://www.tiktok.com/@virtualexperts.ph", icon: "tiktok" },
  ],

  seo: {
    url: "https://virtualexperts.ph",
    keywords: [
      "virtual assistants Philippines",
      "remote staffing",
      "outsourcing Philippines",
      "BPO services",
      "customer support outsourcing",
    ],
    ogImage: "/og-image.png",
    locale: "en_US",
  },
};
