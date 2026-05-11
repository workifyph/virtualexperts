import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { VideoSection } from "@/components/sections";
import { caseStudies as fallbackCaseStudies } from "@/content/siteData";
import { getAllCaseStudies } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how our remote teams have helped businesses improve operations and reduce missed opportunities.",
};

export default async function CaseStudiesPage() {
  const sanityCases = await getAllCaseStudies();
  const useSanity = sanityCases.length > 0;

  return (
    <>
      {/* Hero */}
      <VideoSection src="/welcome-video.mp4" poster="/welcome-video-poster.jpg" halfHeight>
        <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Case Studies</p>
        <h1 className="text-hero-video">
          From bottlenecks to scale —<br />real client results.
        </h1>
        <p className="max-w-xl text-lg text-white/75 mt-6 leading-relaxed">
          See how businesses streamline operations and grow with dedicated remote teams.
        </p>
      </VideoSection>

      {/* Cases */}
      <section className="vex-section" aria-label="Case study details">
        <div className="vex-container">
          <div className="vex-grid vex-grid--3">
            {useSanity
              ? sanityCases.map((cs, i) => {
                  const img = cs.featuredImage?.asset
                    ? urlFor(cs.featuredImage).width(720).height(420).fit("crop").auto("format").url()
                    : null;
                  return (
                    <ScrollReveal key={cs._id} delay={i * 120}>
                      <Link href={`/case-studies/${cs.slug}`} className="case-card" style={{ display: "block" }}>
                        {img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={img}
                            alt={cs.featuredImage?.alt || cs.title}
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
                        <p className="case-card__industry">{cs.clientIndustry}</p>
                        <h2 className="case-card__title">{cs.title}</h2>
                        <p style={{ marginTop: "var(--s-3)" }}>{cs.excerpt}</p>
                      </Link>
                    </ScrollReveal>
                  );
                })
              : fallbackCaseStudies.map((cs, i) => (
                  <ScrollReveal key={cs.slug} delay={i * 120}>
                    <article className="case-card">
                      <p className="case-card__industry">{cs.industry}</p>
                      <h2 className="case-card__title">{cs.title}</h2>
                      <dl>
                        <dt>Challenge</dt>
                        <dd>{cs.challenge}</dd>
                        <dt>Approach</dt>
                        <dd>{cs.approach}</dd>
                        <dt>Outcome</dt>
                        <dd>{cs.outcome}</dd>
                      </dl>
                    </article>
                  </ScrollReveal>
                ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vex-section vex-section--cta" style={{ textAlign: "center" }} aria-label="Get started">
        <div className="vex-container" style={{ maxWidth: "720px" }}>
          <ScrollReveal>
            <h2 className="vex-heading">Your business could be next.</h2>
            <p className="vex-description" style={{ marginBottom: "var(--s-6)" }}>
              Let&apos;s discuss what structured remote support looks like for your team.
            </p>
            <Link href="/contact" className="btn btn-primary">Start a Conversation</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
