import { groq } from "next-sanity";

export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    "category": category->{ title, "slug": slug.current },
    "author": author->{ name, image },
    tags
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    "category": category->{ title, "slug": slug.current },
    "author": author->{ name, bio, image },
    tags,
    body,
    seoTitle,
    seoDescription
  }
`;

export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    clientIndustry,
    excerpt,
    featuredImage,
    publishedAt,
    featured
  }
`;

export const caseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)][].slug.current
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    clientIndustry,
    excerpt,
    featuredImage,
    challenge,
    solution,
    results,
    stats,
    testimonial,
    publishedAt,
    body,
    seoTitle,
    seoDescription
  }
`;

export const featuredCaseStudiesQuery = groq`
  *[_type == "caseStudy" && featured == true && defined(slug.current)] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    clientIndustry,
    excerpt,
    featuredImage { ..., asset->{ url, metadata } }
  }
`;
