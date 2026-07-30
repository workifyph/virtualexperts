import type { TalentCategory } from "./types";

/* ==================================================================
   Talent pool categories

   These are the buttons at the top of /talent. A VA lands in a
   category by adding one line to their profile.md:

       category: Customer Support

   Matching is forgiving — "customer support", "Customer Support
   Agents" and "csr" all land in the same bucket (see `keywords`).
   If a profile has no `category:` line at all, the category is
   inferred from its `role:` instead, so older profiles keep working.

   Typing a category that isn't listed here is allowed: it shows up as
   its own button using the text as typed. Adding it below just gives
   it a proper tagline, an icon, and a fixed position in the row.

   To add a category: copy a block, keep the slug lowercase-with-
   dashes, and put the words a profile might use in `keywords`.
   ================================================================== */

export const TALENT_CATEGORIES: TalentCategory[] = [
  {
    slug: "customer-support",
    title: "Customer Support Agents",
    tagline: "Frontline customer experience specialists who keep queues calm and CSAT high.",
    icon: "🎧",
    keywords: [
      "customer support",
      "customer service",
      "customer experience",
      "support specialist",
      "support agent",
      "csr",
      "helpdesk",
      "help desk",
    ],
  },
  {
    slug: "virtual-assistants",
    title: "Virtual Assistants",
    tagline: "Executive and admin support that gives you back your calendar and your inbox.",
    icon: "🗂️",
    keywords: [
      "virtual assistant",
      "executive assistant",
      "executive va",
      "admin assistant",
      "administrative",
      "va",
      "ea",
    ],
  },
  {
    slug: "technical-support",
    title: "Technical Support",
    tagline: "Tier 1–3 troubleshooting for SaaS, hardware, and IT service desks.",
    icon: "🛠️",
    keywords: [
      "technical support",
      "tech support",
      "it support",
      "technical",
      "sysadmin",
      "network support",
      "tier 2",
      "tier 3",
    ],
  },
  {
    slug: "bookkeeping-admin",
    title: "Bookkeeping & Admin",
    tagline: "Clean books, tidy records, and month-end reports you can actually read.",
    icon: "📊",
    keywords: [
      "bookkeeping",
      "bookkeeper",
      "accounting",
      "accounts payable",
      "accounts receivable",
      "payroll",
      "finance",
      "data entry",
    ],
  },
  {
    slug: "creative-marketing",
    title: "Creative & Marketing",
    tagline: "Design, content, and campaign support that keeps your brand shipping.",
    icon: "🎨",
    keywords: [
      "creative",
      "marketing",
      "social media",
      "graphic design",
      "designer",
      "content",
      "copywriter",
      "video editor",
      "seo",
    ],
  },
];

/** Fallback bucket for a profile we can't classify at all. */
const UNCATEGORIZED: TalentCategory = {
  slug: "specialists",
  title: "Specialists",
  tagline: "Vetted experts across the rest of our talent pool.",
  icon: "⭐",
  keywords: [],
};

export function slugifyCategory(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Find the category whose longest keyword appears in `text`.
 * Longest-match wins so "Bookkeeping & Admin VA" lands in
 * Bookkeeping ("bookkeeping", 11 chars) and not Virtual Assistants
 * ("va", 2 chars).
 */
function matchByKeyword(text: string): TalentCategory | undefined {
  const haystack = ` ${text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;
  let best: TalentCategory | undefined;
  let bestLength = 0;

  for (const category of TALENT_CATEGORIES) {
    for (const keyword of category.keywords) {
      if (keyword.length <= bestLength) continue;
      if (haystack.includes(` ${keyword} `)) {
        best = category;
        bestLength = keyword.length;
      }
    }
  }

  return best;
}

/**
 * Resolve a profile's category from its `category:` line, falling back
 * to its `role:`. An unrecognised `category:` becomes its own category
 * rather than being dropped, so an editor can invent one by typing it.
 */
export function resolveCategory(rawCategory: string | undefined, role: string): TalentCategory {
  const raw = rawCategory?.trim();

  if (raw) {
    const slug = slugifyCategory(raw);
    const exact = TALENT_CATEGORIES.find((category) => category.slug === slug);
    if (exact) return exact;

    const matched = matchByKeyword(raw);
    if (matched) return matched;

    // Unlisted category — surface it as typed.
    return { slug: slug || UNCATEGORIZED.slug, title: raw, tagline: "", icon: "⭐", keywords: [] };
  }

  return matchByKeyword(role) ?? UNCATEGORIZED;
}

/**
 * The categories that actually have someone in them, in the order
 * defined above, with any editor-invented categories appended A→Z.
 */
export function orderTalentCategories(categories: TalentCategory[]): TalentCategory[] {
  const seen = new Map<string, TalentCategory>();
  for (const category of categories) {
    if (!seen.has(category.slug)) seen.set(category.slug, category);
  }

  const known = TALENT_CATEGORIES.filter((category) => seen.has(category.slug)).map(
    (category) => seen.get(category.slug)!,
  );
  const knownSlugs = new Set(TALENT_CATEGORIES.map((category) => category.slug));
  const custom = [...seen.values()]
    .filter((category) => !knownSlugs.has(category.slug))
    .sort((a, b) => a.title.localeCompare(b.title));

  return [...known, ...custom];
}
