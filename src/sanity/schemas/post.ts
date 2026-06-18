import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "The headline shown on the blog and used as the page title.",
      validation: (Rule) => Rule.required().min(8).max(250),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      description: "Auto-generated from the title. Edit only if you must.",
      options: { source: "title", maxLength: 250 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
      rows: 3,
      description: "1–2 sentence summary shown on the blog index and in shared links.",
      validation: (Rule) => Rule.required().min(40).max(220),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description:
        "Shown at the top of the post and on the blog index.\n\n" +
        "Image guidelines:\n" +
        "• Use a clean editorial photograph — no text, logos, or banners baked in.\n" +
        "• Recommended ratio 16:9 (or 4:3). Avoid tall portrait images.\n" +
        "• Minimum width 1600px so the hero stays crisp on retina screens.\n" +
        "• Avoid screenshots, slides, marketing graphics with overlay copy.\n" +
        "• Use the hotspot tool to choose the focal point — the site will crop around it.",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          description:
            "Describe the image for screen readers and SEO. One short sentence, no quotes.",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
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
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      description: "Optional override for the browser tab and search results. Defaults to Title.",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      group: "seo",
      rows: 3,
      description: "Optional meta description. Defaults to Excerpt.",
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
    select: { title: "title", media: "featuredImage", subtitle: "publishedAt" },
    prepare({ title, media, subtitle }) {
      return {
        title,
        media,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : "Draft",
      };
    },
  },
});
