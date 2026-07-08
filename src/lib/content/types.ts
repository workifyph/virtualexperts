export type PostListItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
};

export type Post = PostListItem & {
  body: string;
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
  slug: string;
  title: string;
  clientIndustry: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
  featured: boolean;
};

export type CaseStudy = CaseStudyListItem & {
  challenge: string;
  solution: string;
  results: string;
  stats: Stat[];
  testimonial?: Testimonial;
  body: string;
  seoTitle?: string;
  seoDescription?: string;
};
