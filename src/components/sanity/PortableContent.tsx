import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1200).fit("max").auto("format").url();
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={value.alt || ""}
            loading="lazy"
            className="w-full h-auto rounded-lg"
          />
          {value.caption ? (
            <figcaption className="mt-2 text-sm text-[var(--ink-muted)]">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="underline underline-offset-4 text-[var(--gold-deep)] hover:opacity-80"
        >
          {children}
        </a>
      );
    },
  },
};

export default function PortableContent({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose-vex">
      <PortableText value={value} components={components} />
    </div>
  );
}
