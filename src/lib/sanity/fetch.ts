import { client } from "./client";
import { isSanityConfigured } from "@/sanity/env";
import {
  allPostsQuery,
  postBySlugQuery,
  postSlugsQuery,
  allCaseStudiesQuery,
  caseStudyBySlugQuery,
  caseStudySlugsQuery,
  featuredCaseStudiesQuery,
} from "./queries";
import type {
  Post,
  PostListItem,
  CaseStudy,
  CaseStudyListItem,
} from "./types";

async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    return await client.fetch<T>(query, params);
  } catch (err) {
    console.warn("[sanity] fetch failed:", err);
    return fallback;
  }
}

export const getAllPosts = () =>
  safeFetch<PostListItem[]>(allPostsQuery, {}, []);

export const getPostSlugs = () =>
  safeFetch<string[]>(postSlugsQuery, {}, []);

export const getPostBySlug = (slug: string) =>
  safeFetch<Post | null>(postBySlugQuery, { slug }, null);

export const getAllCaseStudies = () =>
  safeFetch<CaseStudyListItem[]>(allCaseStudiesQuery, {}, []);

export const getCaseStudySlugs = () =>
  safeFetch<string[]>(caseStudySlugsQuery, {}, []);

export const getCaseStudyBySlug = (slug: string) =>
  safeFetch<CaseStudy | null>(caseStudyBySlugQuery, { slug }, null);

export const getFeaturedCaseStudies = () =>
  safeFetch<CaseStudyListItem[]>(featuredCaseStudiesQuery, {}, []);
