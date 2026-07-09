import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "@/sanity/env";

let _client: SanityClient | null = null;

export function getClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (_client) return _client;
  // SANITY_API_READ_TOKEN is only set during CI builds — never bundled to the
  // client. fetch.ts only runs at build time so this is safe.
  const token = process.env.SANITY_API_READ_TOKEN;
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "published",
    token: token || undefined,
  });
  return _client;
}

// Backwards-compat: a thin proxy that lazy-initialises on first .fetch().
// `safeFetch` already gates on `isSanityConfigured`, so this is only reached
// when env is present.
export const client = {
  fetch: <T,>(query: string, params: Record<string, unknown> = {}) => {
    const c = getClient();
    if (!c) return Promise.resolve(undefined as unknown as T);
    return c.fetch<T>(query, params);
  },
};
