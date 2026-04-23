import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { VideoSection } from "@/components/sections";
import { caseStudies } from "@/content/siteData";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how our remote teams have helped businesses improve operations and reduce missed opportunities.",
};

export default function CaseStudiesPage() {
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
            {caseStudies.map((cs, i) => (
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
