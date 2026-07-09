import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import PortableContent from "@/components/sanity/PortableContent";
import { getPostBySlug, getPostSlugs } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

type Props = { params: Promise<{ slug: string }> };

const PLACEHOLDER_SLUG = "coming-soon";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  if (slugs.length === 0) return [{ slug: PLACEHOLDER_SLUG }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    if (slug === PLACEHOLDER_SLUG) return { title: "Blog coming soon" };
    return { title: "Post not found" };
  }
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.featuredImage?.asset
        ? [urlFor(post.featuredImage).width(1200).height(630).fit("crop").url()]
        : undefined,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    if (slug === PLACEHOLDER_SLUG) {
      return (
        <section className="vex-section vex-section--editorial" aria-label="Coming soon">
          <div className="vex-container vex-article" style={{ textAlign: "center" }}>
            <p className="vex-eyebrow">Blog</p>
            <h1 className="vex-heading">Coming soon</h1>
            <p className="vex-description">
              We&apos;re preparing the first articles. Check back shortly.
            </p>
            <Link href="/blog" className="btn btn-primary" style={{ marginTop: "var(--s-6)" }}>
              Back to Blog
            </Link>
          </div>
        </section>
      );
    }
    notFound();
  }

  const heroImg = post.featuredImage?.asset
    ? urlFor(post.featuredImage)
        .width(1600)
        .height(900)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  return (
    <article className="vex-section vex-section--editorial" aria-label={post.title}>
      <div className="vex-container vex-article">
        <ScrollReveal>
          <p className="vex-eyebrow">{post.category?.title || "Blog"}</p>
          <h1 className="vex-heading">{post.title}</h1>
          <p className="vex-description" style={{ marginTop: "var(--s-4)" }}>
            {post.excerpt}
          </p>
          <div className="article-meta">
            {post.author?.name ? <span>By {post.author.name}</span> : null}
            {post.author?.name ? <span className="article-meta__dot" aria-hidden /> : null}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
        </ScrollReveal>

        {heroImg ? (
          <ScrollReveal>
            <div className="article-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImg}
                alt={post.featuredImage?.alt || post.title}
              />
            </div>
          </ScrollReveal>
        ) : null}

        {post.body?.length ? (
          <ScrollReveal>
            <PortableContent value={post.body} />
          </ScrollReveal>
        ) : null}

        <ScrollReveal>
          <nav className="article-nav" aria-label="Article navigation">
            <Link href="/blog" className="btn btn-ghost">
              ← Back to all posts
            </Link>
            <Link href="/contact" className="btn btn-primary">
              Talk to us
            </Link>
          </nav>
        </ScrollReveal>
      </div>
    </article>
  );
}
