import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  _type?: "image";
  alt?: string;
  caption?: string;
  asset?: { _ref?: string; _type?: string };
};

export type Author = {
  name: string;
  bio?: string;
  image?: SanityImage;
};

export type Category = {
  title: string;
  slug: string;
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: SanityImage;
  publishedAt: string;
  category?: Category | null;
  author?: Author | null;
  tags?: string[];
};

export type Post = PostListItem & {
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};

export type Stat = { label: string; value: string };

export type Testimonial = {
  quote?: string;
  author?: string;
  role?: string;
};

export type CaseStudyListItem = {
  _id: string;
  title: string;
  slug: string;
  clientIndustry: string;
  excerpt: string;
  featuredImage?: SanityImage;
  publishedAt: string;
  featured?: boolean;
};

export type CaseStudy = CaseStudyListItem & {
  challenge: string;
  solution: string;
  results: string;
  stats?: Stat[];
  testimonial?: Testimonial;
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};
