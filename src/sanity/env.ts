/**
 * Sanity environment.
 *
 * Build-time fetches in `lib/sanity/fetch.ts` short-circuit when these are
 * unset, so a missing Sanity config never breaks the static export — pages
 * fall back to empty / placeholder UI. The Studio route at `/studio` does
 * require real values at runtime; without them it will show a config error.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

export const isSanityConfigured = Boolean(projectId && dataset);
