import ScrollReveal from "../ScrollReveal";

export default function SectionHeader({
  eyebrow,
  heading,
  description,
  maxWidth = "56ch",
}: {
  eyebrow?: string;
  heading: string;
  description?: string;
  maxWidth?: string;
}) {
  return (
    <ScrollReveal>
      <div className="mb-8">
        {eyebrow && <p className="vex-eyebrow">{eyebrow}</p>}
        <h2
          className="vex-heading"
          dangerouslySetInnerHTML={{ __html: heading }}
        />
        {description && (
          <p className="vex-description" style={{ maxWidth }}>
            {description}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
