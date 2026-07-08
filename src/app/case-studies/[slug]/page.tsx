import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import MarkdownContent from "@/components/MarkdownContent";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/content/caseStudies";

type Props = { params: Promise<{ slug: string }> };

const PLACEHOLDER_SLUG = "coming-soon";

export async function generateStaticParams() {
  const slugs = getCaseStudySlugs();
  if (slugs.length === 0) {
    return [{ slug: PLACEHOLDER_SLUG }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
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
      images: cs.image ? [cs.image] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) {
    if (slug === PLACEHOLDER_SLUG) {
      return (
        <section className="vex-section vex-section--editorial" aria-label="Coming soon">
          <div className="vex-container vex-article" style={{ textAlign: "center" }}>
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

  const statsCount = cs.stats?.length || 0;
  const statsCols = statsCount > 0 ? Math.min(statsCount, 4) : 3;

  return (
    <article className="vex-section vex-section--editorial" aria-label={cs.title}>
      <div className="vex-container vex-article">
        <ScrollReveal>
          <p className="vex-eyebrow">{cs.clientIndustry}</p>
          <h1 className="vex-heading">{cs.title}</h1>
          <p className="vex-description" style={{ marginTop: "var(--s-4)" }}>
            {cs.excerpt}
          </p>
        </ScrollReveal>

        {cs.image ? (
          <ScrollReveal>
            <div className="article-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cs.image} alt={cs.imageAlt || cs.title} />
            </div>
          </ScrollReveal>
        ) : null}

        <ScrollReveal>
          <dl className="case-summary">
            <dt>Challenge</dt>
            <dd>{cs.challenge}</dd>
            <dt>Solution</dt>
            <dd>{cs.solution}</dd>
            <dt>Results</dt>
            <dd>{cs.results}</dd>
          </dl>
        </ScrollReveal>

        {cs.stats?.length ? (
          <ScrollReveal>
            <div
              className="stats-bar"
              style={{ ["--stats-cols" as string]: statsCols }}
            >
              {cs.stats.map((s, i) => (
                <div key={i} className="stats-bar__item">
                  <span className="stats-bar__value">{s.value}</span>
                  <span className="stats-bar__label">{s.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        ) : null}

        {cs.testimonial?.quote ? (
          <ScrollReveal>
            <blockquote className="pull-quote">
              <p className="pull-quote__text">“{cs.testimonial.quote}”</p>
              {cs.testimonial.author ? (
                <p className="pull-quote__attr">
                  — <strong>{cs.testimonial.author}</strong>
                  {cs.testimonial.role ? `, ${cs.testimonial.role}` : ""}
                </p>
              ) : null}
            </blockquote>
          </ScrollReveal>
        ) : null}

        {cs.body ? (
          <ScrollReveal>
            <MarkdownContent>{cs.body}</MarkdownContent>
          </ScrollReveal>
        ) : null}

        <ScrollReveal>
          <nav className="article-nav" aria-label="Case study navigation">
            <Link href="/case-studies" className="btn btn-ghost">
              ← Back to case studies
            </Link>
            <Link href="/contact" className="btn btn-primary">
              Start a conversation
            </Link>
          </nav>
        </ScrollReveal>
      </div>
    </article>
  );
}
