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
        <section className="vex-section" aria-label="Coming soon">
          <div className="vex-container" style={{ maxWidth: "720px", textAlign: "center" }}>
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
    ? urlFor(post.featuredImage).width(1600).height(900).fit("crop").auto("format").url()
    : null;

  return (
    <>
      <article className="vex-section" aria-label={post.title}>
        <div className="vex-container" style={{ maxWidth: "820px" }}>
          <ScrollReveal>
            <p className="vex-eyebrow">
              {post.category?.title ? `${post.category.title} · ` : ""}
              {formatDate(post.publishedAt)}
            </p>
            <h1 className="vex-heading">{post.title}</h1>
            <p className="vex-description">{post.excerpt}</p>
          </ScrollReveal>

          {heroImg ? (
            <ScrollReveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImg}
                alt={post.featuredImage?.alt || post.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "var(--radius-card)",
                  margin: "var(--s-8) 0",
                }}
              />
            </ScrollReveal>
          ) : null}

          {post.body?.length ? (
            <ScrollReveal>
              <PortableContent value={post.body} />
            </ScrollReveal>
          ) : null}

          <ScrollReveal>
            <div style={{ marginTop: "var(--s-12)" }}>
              <Link href="/blog" className="btn btn-ghost">
                ← Back to all posts
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  );
}
