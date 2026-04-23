import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import {
  StatsBar,
  ServiceGrid,
  StepsGrid,
  IndustryPills,
  TestimonialGrid,
  CtaBanner,
} from "@/components/sections";
import { siteConfig } from "@/config";
import {
  heroSlides,
  trustStats,
  services,
  clientTestimonials,
  advantagePillars,
  servedIndustries,
  howModelWorks,
} from "@/content/siteData";

const featuredServices = services.slice(0, 3);

export default function Home() {
  const { brand, contact } = siteConfig;

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} interval={7000}>
        <p className="vex-eyebrow">
          {brand.name}
        </p>
        <h1 className="text-hero-video mb-6">
          Your remote team,
          <br />
          built to perform.
        </h1>
        <p className="max-w-xl text-lg text-white/75 mb-10 leading-relaxed">
          {brand.tagline}
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

      {/* Trust Stats */}
      <StatsBar stats={trustStats} />

      {/* Services */}
      <ServiceGrid
        eyebrow="What We Do"
        heading="Structured support,<br/>tailored to your business."
        description="From customer calls to back-office workflows, our managed teams handle the work so you can focus on growth."
        services={featuredServices}
        ctaLabel="View All Services"
        ctaHref="/services"
      />

      {/* Differentiator — editorial layout */}
      <section className="vex-section vex-section--dark" aria-label="The VEX Difference">
        <div className="vex-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--s-8)" }}>
            <ScrollReveal>
              <p className="vex-eyebrow">The VEX Difference</p>
              <h2 className="vex-heading" style={{ fontSize: "var(--text-hero)", maxWidth: "20ch" }}>
                Not freelancers.<br />Not a generic agency.
              </h2>
            </ScrollReveal>

            <div className="vex-grid vex-grid--3">
              {advantagePillars.map((pillar, i) => (
                <ScrollReveal key={pillar.title} delay={i * 100}>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--display)",
                      fontSize: "var(--text-card-title)",
                      fontWeight: 700,
                      color: "#fffaf0",
                      marginBottom: "var(--s-2)",
                    }}>{pillar.title}</h3>
                    <p style={{
                      color: "rgba(255,248,239,0.7)",
                      fontSize: "var(--text-body)",
                      lineHeight: 1.65,
                    }}>{pillar.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <StepsGrid
        eyebrow="How It Works"
        heading="Four steps to your<br/>dedicated team."
        steps={howModelWorks}
        variant="tan"
        ctaLabel="Learn More"
        ctaHref="/how-it-works"
      />

      {/* Industries */}
      <IndustryPills
        eyebrow="Industries"
        heading="Support built for<br/>your industry."
        industries={servedIndustries}
      />

      {/* Testimonials */}
      <TestimonialGrid
        eyebrow="Client Stories"
        heading="Trusted by businesses<br/>that need to scale."
        testimonials={clientTestimonials}
      />

      {/* CTA */}
      <CtaBanner
        heading="Ready to build your remote team?"
        description="Start with a conversation. We'll scope the role, match the talent, and handle the rest."
        primaryLabel="Send an Inquiry"
        primaryHref="/contact"
        secondaryLabel="Chat on WhatsApp"
        secondaryHref={contact.whatsappLink}
        image="/cta-hero.png"
      />
    </>
  );
}
