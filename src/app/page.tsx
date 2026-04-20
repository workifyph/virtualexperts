import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import {
  StatsBar,
  ServiceGrid,
  VideoSection,
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

export default function Home() {
  const { brand, contact } = siteConfig;

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} interval={7000}>
        <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>
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
        services={services}
        ctaLabel="View All Services"
        ctaHref="/services"
      />

      {/* Differentiator Video Section */}
      <VideoSection src="/video-02.mp4" poster="/video-02-poster.jpg">
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
      </VideoSection>

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
        image="/home-hero.jpg"
      />
    </>
  );
}
