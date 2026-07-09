import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { getAllPosts } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on remote operations, virtual assistance, and scaling support teams.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const isSingle = posts.length === 1;

  return (
    <section className="vex-section vex-section--editorial" aria-label="Blog">
      <div className="vex-container">
        <ScrollReveal>
          <header className="mb-12 max-w-2xl">
            <p className="vex-eyebrow">Blog</p>
            <h1 className="vex-heading">Insights on remote operations.</h1>
            <p className="vex-description">
              Lessons, frameworks, and stories from inside our remote teams.
            </p>
          </header>
        </ScrollReveal>

        {posts.length === 0 ? (
          <ScrollReveal>
            <div
              className="editorial-card"
              style={{ maxWidth: 520, margin: "0 auto", padding: "var(--s-12) var(--s-6)", textAlign: "center" }}
            >
              <p className="case-card__industry">Coming soon</p>
              <h2 className="editorial-card__title" style={{ marginTop: "var(--s-3)" }}>
                The first articles are on the way.
              </h2>
              <p className="editorial-card__excerpt" style={{ marginTop: "var(--s-3)" }}>
                We&apos;re preparing our launch lineup. Check back shortly.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className={`editorial-grid${isSingle ? " editorial-grid--single" : ""}`}>
            {posts.map((post, i) => {
              const imgUrl = post.featuredImage?.asset
                ? urlFor(post.featuredImage)
                    .width(960)
                    .height(600)
                    .fit("crop")
                    .auto("format")
                    .url()
                : null;
              const initial = post.title.charAt(0).toUpperCase();
              return (
                <ScrollReveal key={post._id} delay={i * 100}>
                  <Link href={`/blog/${post.slug}`} className="editorial-card" aria-label={post.title}>
                    <div className="editorial-card__media">
                      {imgUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imgUrl}
                          alt={post.featuredImage?.alt || post.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className="editorial-card__media editorial-card__media--placeholder">
                          {initial}
                        </div>
                      )}
                    </div>
                    <div className="editorial-card__body">
                      <p className="case-card__industry">
                        {post.category?.title || formatDate(post.publishedAt)}
                      </p>
                      <h2 className="editorial-card__title">{post.title}</h2>
                      <p className="editorial-card__excerpt">{post.excerpt}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
