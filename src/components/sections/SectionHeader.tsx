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
  // Split on <br/> or <br /> to support line breaks without dangerouslySetInnerHTML
  const headingParts = heading.split(/<br\s*\/?>/);

  return (
    <ScrollReveal>
      <div className="mb-8">
        {eyebrow && <p className="vex-eyebrow">{eyebrow}</p>}
        <h2 className="vex-heading">
          {headingParts.map((part, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {part}
            </span>
          ))}
        </h2>
        {description && (
          <p className="vex-description" style={{ maxWidth }}>
            {description}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
