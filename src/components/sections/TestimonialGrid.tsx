import ScrollReveal from "../ScrollReveal";
import SectionHeader from "./SectionHeader";
import type { TestimonialItem } from "@/config/types";

export default function TestimonialGrid({
  eyebrow = "Client Stories",
  heading = "Trusted by businesses<br/>that need to scale.",
  testimonials,
  columns = 3,
}: {
  eyebrow?: string;
  heading?: string;
  testimonials: TestimonialItem[];
  columns?: 2 | 3;
}) {
  const [spotlight, ...rest] = testimonials;

  return (
    <section className="vex-section vex-section--light" aria-label={eyebrow}>
      <div className="vex-container">
        <SectionHeader eyebrow={eyebrow} heading={heading} />

        {/* Spotlight testimonial */}
        {spotlight && (
          <ScrollReveal>
            <blockquote className="testimonial-card" style={{
              padding: "var(--s-8)",
              marginBottom: "var(--s-6)",
              background: "linear-gradient(135deg, rgba(199,155,68,0.06), rgba(248,239,224,0.9))",
            }}>
              <span className="quote-mark" aria-hidden="true" style={{ fontSize: "4.5rem" }}>&ldquo;</span>
              <p className="testimonial-card__quote" style={{
                fontSize: "1.15rem",
                lineHeight: 1.8,
                maxWidth: "72ch",
              }}>
                {spotlight.quote}
              </p>
              <footer style={{ marginTop: "var(--s-4)" }}>
                <strong className="testimonial-card__name" style={{ fontSize: "1.1rem" }}>
                  {spotlight.name}
                </strong>
                <span className="testimonial-card__role">{spotlight.role}</span>
              </footer>
            </blockquote>
          </ScrollReveal>
        )}

        {/* Remaining testimonials */}
        {rest.length > 0 && (
          <div className={`vex-grid vex-grid--${columns}`}>
            {rest.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 120}>
                <blockquote className="testimonial-card">
                  <span className="quote-mark" aria-hidden="true">&ldquo;</span>
                  <p className="testimonial-card__quote">{t.quote}</p>
                  <footer>
                    <strong className="testimonial-card__name">{t.name}</strong>
                    <span className="testimonial-card__role">{t.role}</span>
                  </footer>
                </blockquote>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
