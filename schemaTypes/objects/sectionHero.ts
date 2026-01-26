import { defineField, defineType } from "sanity";

export const sectionHero = defineType({
  name: "sectionHero",
  title: "Section: Hero",
  type: "object",

  fields: [
    // =========================
    // CONTENT
    // =========================
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small line above headline (optional)",
    }),

    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 2,
    }),

    // =========================
    // VISUAL VARIANT
    // =========================
    defineField({
      name: "variant",
      title: "Hero Variant",
      type: "string",
      initialValue: "standard",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          {
            title: "Signature (Homepage Cutout)",
            value: "signatureCutout",
          },
        ],
        layout: "radio",
      },
      description:
        "Use the Signature variant only for the homepage or special landing pages.",
      validation: (Rule) => Rule.required(),
    }),

    // =========================
    // MEDIA
    // =========================
    defineField({
      name: "media",
      title: "Hero Background Media",
      type: "reference",
      to: [{ type: "imageAsset" }, { type: "videoAsset" }],
      validation: (Rule) => Rule.required(),
    }),

    // Optional cutout image, only relevant for signature variant
    defineField({
      name: "cutoutImage",
      title: "Cutout Image (Signature only)",
      type: "image",
      description:
        "Transparent PNG used for the Signature hero variant (homepage).",
      hidden: ({ parent }) => parent?.variant !== "signatureCutout",
    }),

    // =========================
    // CTA
    // =========================
    defineField({
      name: "cta",
      title: "Primary CTA",
      type: "cta",
    }),
defineField({
  name: "secondaryCta",
  title: "Secondary CTA",
  type: "cta",
}),

    // =========================
    // LAYOUT MODE
    // =========================
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      initialValue: "overlay",
      options: {
        list: [
          { title: "Text over image", value: "overlay" },
          { title: "Split (image + text)", value: "split" },
        ],
        layout: "radio",
      },
      description:
        "Controls text placement. Independent of the hero variant.",
    }),
  ],

  preview: {
    select: {
      title: "headline",
      variant: "variant",
    },
    prepare({ title, variant }) {
      return {
        title: title || "Hero",
        subtitle:
          variant === "signatureCutout"
            ? "Signature Hero"
            : "Standard Hero",
      };
    },
  },
});
