import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { isValidElement } from "react";

const components: Components = {
  // A paragraph whose only child is an image renders as a figure instead,
  // so images aren't nested inside <p> (invalid HTML).
  p: ({ children }) => {
    const arr = Array.isArray(children) ? children : [children];
    const nonEmpty = arr.filter((c) => c !== "\n" && c !== "");
    if (
      nonEmpty.length === 1 &&
      isValidElement(nonEmpty[0]) &&
      (nonEmpty[0].type === components.img || nonEmpty[0].type === "img")
    ) {
      return <>{nonEmpty[0]}</>;
    }
    return <p>{children}</p>;
  },
  img: ({ src, alt, title }) => (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={typeof src === "string" ? src : ""} alt={alt || ""} loading="lazy" />
      {title ? <figcaption>{title}</figcaption> : null}
    </figure>
  ),
  a: ({ href, children }) => {
    const isExternal = /^https?:\/\//.test(href || "");
    return (
      <a
        href={href || "#"}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
};

export default function MarkdownContent({ children }: { children: string }) {
  return (
    <div className="prose-vex">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
