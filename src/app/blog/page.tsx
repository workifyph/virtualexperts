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

  return (
    <>
      <section className="vex-section" aria-label="Blog">
        <div className="vex-container">
          <ScrollReveal>
            <p className="vex-eyebrow">Blog</p>
            <h1 className="vex-heading">Insights on remote operations.</h1>
            <p className="vex-description">
              Lessons, frameworks, and stories from inside our remote teams.
            </p>
          </ScrollReveal>

          {posts.length === 0 ? (
            <ScrollReveal>
              <div
                className="case-card"
                style={{ marginTop: "var(--s-12)", textAlign: "center" }}
              >
                <p className="case-card__industry">Coming soon</p>
                <h2 className="case-card__title">No posts yet</h2>
                <p style={{ marginTop: "var(--s-3)" }}>
                  We&apos;re preparing the first articles. Check back soon.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <div className="vex-grid vex-grid--3" style={{ marginTop: "var(--s-12)" }}>
              {posts.map((post, i) => {
                const img =
                  post.featuredImage?.asset
                    ? urlFor(post.featuredImage).width(720).height(420).fit("crop").auto("format").url()
                    : null;
                return (
                  <ScrollReveal key={post._id} delay={i * 100}>
                    <Link href={`/blog/${post.slug}`} className="case-card" style={{ display: "block" }}>
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img}
                          alt={post.featuredImage?.alt || post.title}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "var(--radius-card)",
                            marginBottom: "var(--s-4)",
                          }}
                        />
                      ) : null}
                      <p className="case-card__industry">
                        {post.category?.title || formatDate(post.publishedAt)}
                      </p>
                      <h2 className="case-card__title">{post.title}</h2>
                      <p style={{ marginTop: "var(--s-3)" }}>{post.excerpt}</p>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
