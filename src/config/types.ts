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
  /** Dark-on-light lockup, for light surfaces. */
  logo: string;
  /** White-on-dark lockup, for dark surfaces (footer, transparent header). */
  logoLight: string;
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
  /** Folder name under public/leadership/. */
  slug: string;
  name: string;
  role: string;
  /** Path under /public. Empty ("") when no photo has been added yet. */
  image: string;
  bio: string;
  /** Display order — lower first; unnumbered people sort last. */
  order: number;
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

// ── Blog & case studies (content/ folders) ──

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, "YYYY-MM-DD". */
  date: string;
  author?: string;
  category?: string;
  tags: string[];
  /** Path under /public. Empty ("") renders an initial-letter placeholder. */
  cover: string;
  coverAlt: string;
  seoTitle?: string;
  seoDescription?: string;
  /** Article body, already rendered from Markdown. */
  bodyHtml: string;
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  excerpt: string;
  date: string;
  challenge: string;
  solution: string;
  results: string;
  stats: CaseStudyStat[];
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  cover: string;
  coverAlt: string;
  seoTitle?: string;
  seoDescription?: string;
  /** Long-form story below the summary, rendered from Markdown. */
  bodyHtml: string;
}

export interface TalentCategory {
  /** lowercase-with-dashes, used as the filter key */
  slug: string;
  title: string;
  /** Short line under the title on the category button. */
  tagline: string;
  /** Emoji, matching the IndustryItem convention. */
  icon: string;
  /** Words in a profile's `category:` or `role:` that map here. */
  keywords: string[];
}

export interface TalentProfile {
  slug: string;
  name: string;
  role: string;
  available: boolean;
  /** Category slug — see src/config/talentCategories.ts. */
  category: string;
  /** Human label for that category, for the card badge. */
  categoryTitle: string;
  /** Optional focus line, e.g. "Tier 2 Technical Support". */
  specialization?: string;
  /** e.g. "6 years" */
  experience?: string;
  location?: string;
  skills: string[];
  tools: string[];
  languages: string[];
  /** Bio paragraphs from the profile.md body. */
  bio: string[];
  /** Path under /public. Empty ("") renders an initials placeholder. */
  photo: string;
}
