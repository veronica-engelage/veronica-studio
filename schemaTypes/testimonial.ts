import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "transactionType",
      title: "Transaction Type",
      type: "string",
      options: {
        list: [
          { title: "Buyer", value: "buyer" },
          { title: "Seller", value: "seller" },
        ],
        layout: "radio",
      },
    }),

    // Optional but highly recommended: short headline for hero success story use
    defineField({
      name: "headline",
      title: "Short Headline",
      type: "string",
      description: "Optional. Example: “Closed fast in a competitive market.”",
    }),

    defineField({
      name: "text",
      title: "Testimonial",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),

    // Optional metadata = “success story” credibility
    defineField({
      name: "location",
      title: "Location / Area",
      type: "string",
      description: "Optional. Example: “Mount Pleasant” or “Old Village”.",
    }),

    defineField({
      name: "result",
      title: "Result Highlight",
      type: "string",
      description:
        "Optional. Example: “Won in multiple offers”, “Sold over asking”, “Closed in 21 days”.",
    }),

    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "Optional. Month/year is fine.",
      options: { dateFormat: "YYYY-MM-DD" },
    }),

    defineField({
      name: "photo",
      title: "Client Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Accessibility text (optional).",
        }),
      ],
    }),

    defineField({
      name: "approvedForMarketing",
      title: "Approved for Marketing",
      type: "boolean",
      initialValue: true,
      description: "Turn off if the client didn’t explicitly approve usage.",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "headline",
      media: "photo",
      transactionType: "transactionType",
      location: "location",
      result: "result",
    },
    prepare({ title, subtitle, media, transactionType, location, result }) {
      const bits = [
        transactionType ? String(transactionType).toUpperCase() : null,
        location || null,
        result || null,
      ].filter(Boolean);

      return {
        title: title || "Untitled testimonial",
        subtitle: subtitle || bits.join(" · "),
        media,
      };
    },
  },
});
