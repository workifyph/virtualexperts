import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import HeroCarousel from "@/components/HeroCarousel";
import {
  trustStats,
  services,
  clientTestimonials,
  advantagePillars,
  servedIndustries,
  howModelWorks,
  businessProfile,
} from "@/content/siteData";

export default function Home() {
  return (
    <>
      {/* ══════ HERO — Carousel: image → video → image ══════ */}
      <HeroCarousel
        slides={[
          { type: "image", src: "/welcome-video-poster.jpg", alt: "VEX executive leadership in modern office" },
          { type: "video", src: "/welcome-video.mp4", poster: "/welcome-video-poster.jpg" },
          { type: "image", src: "/video-02-poster.jpg", alt: "VEX team collaboration and strategy session" },
        ]}
        interval={7000}
      >
        <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>
          {businessProfile.legalName}
        </p>
        <h1 className="text-hero-video mb-6">
          Your remote team,
          <br />
          built to perform.
        </h1>
        <p className="max-w-xl text-lg text-white/75 mb-10 leading-relaxed">
          {businessProfile.tagline}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact" className="btn btn-overlay-primary">
            Start a Conversation
          </Link>
          <Link href="/services" className="btn btn-overlay-secondary">
            Explore Services
          </Link>
        </div>
      </HeroCarousel>

      {/* ══════ TRUST STATS — Proof ribbon ══════ */}
      <section className="vex-section vex-section--light" aria-label="Company highlights">
        <div className="vex-container">
          <div className="vex-grid vex-grid--4">
            {trustStats.map((stat) => (
              <div key={stat.label} className="proof-stat">
                <span className="proof-stat__value">{stat.value}</span>
                <span className="proof-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SERVICES — Service panels ══════ */}
      <section className="vex-section" aria-label="Our services">
        <div className="vex-container">
          <ScrollReveal>
            <div className="mb-8">
              <p className="vex-eyebrow">What We Do</p>
              <h2 className="vex-heading">
                Structured support,<br />tailored to your business.
              </h2>
              <p className="vex-description" style={{ maxWidth: "56ch" }}>
                From customer calls to back-office workflows, our managed teams
                handle the work so you can focus on growth.
              </p>
            </div>
          </ScrollReveal>

          <div className="vex-grid vex-grid--3">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.slug} delay={i * 100}>
                <div className="service-panel">
                  <p className="service-panel__label">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="service-panel__title">{svc.title}</h3>
                  <p className="service-panel__body">{svc.shortDesc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-8 text-center">
              <Link href="/services" className="btn btn-tertiary">
                View All Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════ VEX DIFFERENCE — Full-bleed video ══════ */}
      <section className="section-full" aria-label="The VEX difference">
        <div className="section-media">
          <video autoPlay muted loop playsInline poster="/video-02-poster.jpg" preload="auto">
            <source src="/video-02.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="section-content section-content--center">
          <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>
            The VEX Difference
          </p>
          <h2 className="text-section-video mb-8">
            Not freelancers.<br />Not a generic agency.
          </h2>
          <div className="vex-grid vex-grid--3" style={{ maxWidth: "56rem", width: "100%" }}>
            {advantagePillars.map((pillar) => (
              <div key={pillar.title} className="service-panel" style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <h3 className="service-panel__title" style={{ color: "#fffaf0" }}>
                  {pillar.title}
                </h3>
                <p className="service-panel__body" style={{ color: "rgba(255,248,239,0.75)" }}>
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS — Step cards ══════ */}
      <section className="vex-section vex-section--tan" aria-label="How it works">
        <div className="vex-container">
          <ScrollReveal>
            <div className="mb-8">
              <p className="vex-eyebrow">How It Works</p>
              <h2 className="vex-heading">
                Four steps to your<br />dedicated team.
              </h2>
            </div>
          </ScrollReveal>

          <div className="vex-grid vex-grid--4">
            {howModelWorks.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 120}>
                <div className="step-card">
                  <div className="step-badge">{step.step}</div>
                  <h3 className="step-card__title">{step.title}</h3>
                  <p className="step-card__body">{step.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-8 text-center">
              <Link href="/how-it-works" className="btn btn-tertiary">
                Learn More
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════ INDUSTRIES — Pill grid ══════ */}
      <section className="vex-section" aria-label="Industries we serve">
        <div className="vex-container">
          <ScrollReveal>
            <div className="mb-8">
              <p className="vex-eyebrow">Industries</p>
              <h2 className="vex-heading">
                Support built for<br />your industry.
              </h2>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap gap-3">
            {servedIndustries.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 40}>
                <span className="industry-pill">
                  <span role="img" aria-label={ind.name}>{ind.icon}</span>
                  {ind.name}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS — VEX testimonial cards ══════ */}
      <section className="vex-section vex-section--light" aria-label="Client testimonials">
        <div className="vex-container">
          <ScrollReveal>
            <div className="mb-8">
              <p className="vex-eyebrow">Client Stories</p>
              <h2 className="vex-heading">
                Trusted by businesses<br />that need to scale.
              </h2>
            </div>
          </ScrollReveal>

          <div className="vex-grid vex-grid--3">
            {clientTestimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 120}>
                <blockquote className="testimonial-card">
                  <span className="quote-mark" aria-hidden="true">&ldquo;</span>
                  <p className="testimonial-card__quote">
                    {t.quote}
                  </p>
                  <footer>
                    <strong className="testimonial-card__name">{t.name}</strong>
                    <span className="testimonial-card__role">{t.role}</span>
                  </footer>
                </blockquote>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA — Full-bleed video ══════ */}
      <section className="section-full section-full--half" aria-label="Get started">
        <div className="section-media">
          <img src="/home-hero.jpg" alt="Virtual Experts team" loading="lazy" />
        </div>
        <div className="section-content section-content--center">
          <h2 className="text-section-video mb-4">
            Ready to build your<br />remote team?
          </h2>
          <p className="text-lg text-white/70 max-w-xl mb-8 leading-relaxed">
            Start with a conversation. We&apos;ll scope the role, match the
            talent, and handle the rest.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-overlay-primary">
              Send an Inquiry
            </Link>
            <a
              href={businessProfile.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-overlay-secondary"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
