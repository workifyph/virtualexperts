/* ══════════════════════════════════════════════════════════════
   Template Type Definitions
   All config shapes for the visually-rich web app template
   ══════════════════════════════════════════════════════════════ */

// ── Theme ──

export interface ThemeColors {
  bg: string;
  paper: string;
  paperStrong: string;
  ink: string;
  inkSoft: string;
  muted: string;
  line: string;
  accent: string;
  accentDeep: string;
  accentSoft: string;
  sand: string;
  tan: string;
  charcoal: string;
  charcoalSoft: string;
}

export interface ThemeTypography {
  display: string;
  sans: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
}

// ── Site Config ──

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Brand {
  name: string;
  shortName: string;
  logo: string;
  tagline: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsappLink?: string;
  address?: string;
  hours?: string;
  hoursContext?: string;
}

export interface SiteConfig {
  brand: Brand;
  contact: ContactInfo;
  nav: NavLink[];
  social: SocialLink[];
  seo: {
    url: string;
    keywords: string[];
    ogImage: string;
    locale: string;
  };
}

// ── Section Block Types ──

export interface HeroSlide {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface StepItem {
  step: string;
  title: string;
  body: string;
}

export interface CaseStudyItem {
  slug: string;
  industry: string;
  title: string;
  image?: string;
  challenge: string;
  approach: string;
  outcome: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface IndustryItem {
  name: string;
  icon: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GalleryImage {
  /** Path under /public. Leave empty ("") to render a placeholder tile. */
  src: string;
  alt?: string;
  caption?: string;
}

export interface GalleryAlbum {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  images: GalleryImage[];
}

export interface PillarItem {
  title: string;
  body: string;
}

export interface TalentProfile {
  slug: string;
  name: string;
  role: string;
  available: boolean;
  /** e.g. "6 years" */
  experience?: string;
  location?: string;
  skills: string[];
  tools: string[];
  /** Bio paragraphs from the profile.md body. */
  bio: string[];
  /** Path under /public. Empty ("") renders an initials placeholder. */
  photo: string;
}
