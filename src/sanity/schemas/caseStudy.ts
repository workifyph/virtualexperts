import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "results", title: "Results" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().min(6).max(120),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      description: "Auto-generated from the title.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientIndustry",
      title: "Client industry",
      type: "string",
      group: "content",
      description: "e.g. Real Estate, Healthcare, Logistics.",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description:
        "Shown at the top of the case study and on the case studies index.\n\n" +
        "Image guidelines:\n" +
        "• Use a clean editorial photograph that represents the client's industry or workflow.\n" +
        "• Recommended ratio 16:9 (or 4:3). Avoid tall portrait images.\n" +
        "• Minimum width 1600px for retina sharpness.\n" +
        "• Never use marketing graphics, slides, screenshots, or images with baked-in text.\n" +
        "• Use the hotspot tool to set the focal point so cropping looks right.",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          description:
            "Describe the image for screen readers and SEO. One short sentence.",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
      rows: 2,
      description: "Short summary shown on the case studies index.",
      validation: (Rule) => Rule.required().min(40).max(240),
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      group: "content",
      rows: 4,
      description: "What problem did the client face?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      group: "content",
      rows: 4,
      description: "How did Virtual Experts solve it?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "results",
      title: "Results summary",
      type: "text",
      group: "results",
      rows: 4,
      description: "Plain-language summary of outcomes.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "results",
      description: "Numeric outcomes shown as a stats bar.",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required().max(40),
            },
            {
              name: "value",
              title: "Value",
              type: "string",
              description: "e.g. 40%, 2x, 12 hrs",
              validation: (Rule) => Rule.required().max(20),
            },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "object",
      group: "results",
      fields: [
        { name: "quote", title: "Quote", type: "text", rows: 3 },
        { name: "author", title: "Author", type: "string" },
        { name: "role", title: "Role / company", type: "string" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured?",
      type: "boolean",
      group: "content",
      description: "Show this case study in featured spots on the homepage.",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      group: "seo",
      rows: 3,
      validation: (Rule) => Rule.max(170),
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "clientIndustry", media: "featuredImage" },
  },
});
