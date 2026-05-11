import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import PortableContent from "@/components/sanity/PortableContent";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

type Props = { params: Promise<{ slug: string }> };

const PLACEHOLDER_SLUG = "coming-soon";

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  if (slugs.length === 0) {
    // Static export requires at least one param. Render a placeholder until
    // the CMS has real content.
    return [{ slug: PLACEHOLDER_SLUG }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) {
    if (slug === PLACEHOLDER_SLUG) return { title: "Case studies coming soon" };
    return { title: "Case study not found" };
  }
  return {
    title: cs.seoTitle || cs.title,
    description: cs.seoDescription || cs.excerpt,
    openGraph: {
      title: cs.seoTitle || cs.title,
      description: cs.seoDescription || cs.excerpt,
      type: "article",
      images: cs.featuredImage?.asset
        ? [urlFor(cs.featuredImage).width(1200).height(630).fit("crop").url()]
        : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);

  if (!cs) {
    if (slug === PLACEHOLDER_SLUG) {
      return (
        <section className="vex-section" aria-label="Coming soon">
          <div className="vex-container" style={{ maxWidth: "720px", textAlign: "center" }}>
            <p className="vex-eyebrow">Case Studies</p>
            <h1 className="vex-heading">Coming soon</h1>
            <p className="vex-description">
              We&apos;re preparing real client stories. Check back shortly.
            </p>
            <Link href="/case-studies" className="btn btn-primary" style={{ marginTop: "var(--s-6)" }}>
              Back to Case Studies
            </Link>
          </div>
        </section>
      );
    }
    notFound();
  }

  const heroImg = cs.featuredImage?.asset
    ? urlFor(cs.featuredImage).width(1600).height(900).fit("crop").auto("format").url()
    : null;

  return (
    <>
      <article className="vex-section" aria-label={cs.title}>
        <div className="vex-container" style={{ maxWidth: "880px" }}>
          <ScrollReveal>
            <p className="vex-eyebrow">{cs.clientIndustry}</p>
            <h1 className="vex-heading">{cs.title}</h1>
            <p className="vex-description">{cs.excerpt}</p>
          </ScrollReveal>

          {heroImg ? (
            <ScrollReveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImg}
                alt={cs.featuredImage?.alt || cs.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "var(--radius-card)",
                  margin: "var(--s-8) 0",
                }}
              />
            </ScrollReveal>
          ) : null}

          <ScrollReveal>
            <article className="case-card">
              <dl>
                <dt>Challenge</dt>
                <dd>{cs.challenge}</dd>
                <dt>Solution</dt>
                <dd>{cs.solution}</dd>
                <dt>Results</dt>
                <dd>{cs.results}</dd>
              </dl>
            </article>
          </ScrollReveal>

          {cs.stats?.length ? (
            <ScrollReveal>
              <div
                className="vex-grid"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(cs.stats.length, 4)}, minmax(0, 1fr))`,
                  margin: "var(--s-10) 0",
                  gap: "var(--s-6)",
                }}
              >
                {cs.stats.map((s, i) => (
                  <div key={i} className="case-card" style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "var(--text-section)", fontWeight: 600 }}>
                      {s.value}
                    </p>
                    <p className="case-card__industry">{s.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ) : null}

          {cs.testimonial?.quote ? (
            <ScrollReveal>
              <blockquote
                className="case-card"
                style={{
                  fontStyle: "italic",
                  borderLeft: "4px solid var(--gold)",
                }}
              >
                <p>“{cs.testimonial.quote}”</p>
                {cs.testimonial.author ? (
                  <p style={{ marginTop: "var(--s-4)", fontStyle: "normal" }}>
                    — <strong>{cs.testimonial.author}</strong>
                    {cs.testimonial.role ? `, ${cs.testimonial.role}` : ""}
                  </p>
                ) : null}
              </blockquote>
            </ScrollReveal>
          ) : null}

          {cs.body?.length ? (
            <ScrollReveal>
              <PortableContent value={cs.body} />
            </ScrollReveal>
          ) : null}

          <ScrollReveal>
            <div style={{ marginTop: "var(--s-12)" }}>
              <Link href="/case-studies" className="btn btn-ghost">
                ← Back to all case studies
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  );
}
