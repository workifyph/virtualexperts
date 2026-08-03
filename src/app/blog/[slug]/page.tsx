import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import { formatArticleDate, getBlogPost, getBlogPosts } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

const PLACEHOLDER_SLUG = "coming-soon";

export function generateStaticParams() {
  const posts = getBlogPosts();
  if (posts.length === 0) return [{ slug: PLACEHOLDER_SLUG }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
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
      publishedTime: post.date || undefined,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

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

  return (
    <article className="vex-section vex-section--editorial" aria-label={post.title}>
      <div className="vex-container vex-article">
        <ScrollReveal>
          <p className="vex-eyebrow">{post.category || "Blog"}</p>
          <h1 className="vex-heading">{post.title}</h1>
          <p className="vex-description" style={{ marginTop: "var(--s-4)" }}>
            {post.excerpt}
          </p>
          <div className="article-meta">
            {post.author ? <span>By {post.author}</span> : null}
            {post.author ? <span className="article-meta__dot" aria-hidden /> : null}
            {post.date ? <time dateTime={post.date}>{formatArticleDate(post.date)}</time> : null}
          </div>
        </ScrollReveal>

        {post.cover ? (
          <ScrollReveal>
            <div className="article-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover} alt={post.coverAlt} />
            </div>
          </ScrollReveal>
        ) : null}

        {post.bodyHtml ? (
          <ScrollReveal>
            <div
              className="prose-vex"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />
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
