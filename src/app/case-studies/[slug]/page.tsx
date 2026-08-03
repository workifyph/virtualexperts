import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import { getCaseStudies, getCaseStudy } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

const PLACEHOLDER_SLUG = "coming-soon";

export function generateStaticParams() {
  const cases = getCaseStudies();
  if (cases.length === 0) {
    return [{ slug: PLACEHOLDER_SLUG }];
  }
  return cases.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
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
      images: cs.cover ? [cs.cover] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

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
          <p className="vex-eyebrow">{cs.industry}</p>
          <h1 className="vex-heading">{cs.title}</h1>
          <p className="vex-description" style={{ marginTop: "var(--s-4)" }}>
            {cs.excerpt}
          </p>
        </ScrollReveal>

        {cs.cover ? (
          <ScrollReveal>
            <div className="article-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cs.cover} alt={cs.coverAlt} />
            </div>
          </ScrollReveal>
        ) : null}

        <ScrollReveal>
          <dl className="case-summary">
            <dt>Challenge</dt>
            <dd dangerouslySetInnerHTML={{ __html: cs.challenge }} />
            <dt>Solution</dt>
            <dd dangerouslySetInnerHTML={{ __html: cs.solution }} />
            <dt>Results</dt>
            <dd dangerouslySetInnerHTML={{ __html: cs.results }} />
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

        {cs.quote ? (
          <ScrollReveal>
            <blockquote className="pull-quote">
              <p className="pull-quote__text">“{cs.quote}”</p>
              {cs.quoteAuthor ? (
                <p className="pull-quote__attr">
                  — <strong>{cs.quoteAuthor}</strong>
                  {cs.quoteRole ? `, ${cs.quoteRole}` : ""}
                </p>
              ) : null}
            </blockquote>
          </ScrollReveal>
        ) : null}

        {cs.bodyHtml ? (
          <ScrollReveal>
            <div
              className="prose-vex"
              dangerouslySetInnerHTML={{ __html: cs.bodyHtml }}
            />
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
