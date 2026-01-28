import { defineField, defineType } from "sanity";

export const sectionTestimonials = defineType({
  name: "sectionTestimonials",
  title: "Section: Testimonials",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Testimonials",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      initialValue: "grid",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "Carousel", value: "carousel" }, // you can ignore for now
          { title: "Single", value: "single" },
          { title: "Hero", value: "hero" },
        ],
        layout: "radio",
      },
    }),
    defineField({
  name: "featured",
  title: "Featured Testimonial",
  type: "reference",
  to: [{ type: "testimonial" }],
  hidden: ({ parent }) => !["single", "hero"].includes(parent?.layout),
}),
defineField({
  name: "testimonials",
  title: "Testimonials",
  type: "array",
  of: [{ type: "reference", to: [{ type: "testimonial" }] }],
  hidden: ({ parent }) => ["single", "hero"].includes(parent?.layout),
}),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Testimonials Section" };
    },
  },
});
