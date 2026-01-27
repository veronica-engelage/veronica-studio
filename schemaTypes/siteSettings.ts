import { defineType, defineField } from "sanity";

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand" },
    { name: "contact", title: "Contact" },
    { name: "nav", title: "Navigation" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ----------------------------
    // BRAND
    // ----------------------------
    defineField({
      name: "brandName",
      title: "Brand name (internal label)",
      type: "string",
      group: "brand",
      initialValue: "Veronica Engelage Carolina One Real Estate",
    }),

    defineField({
      name: "agentName",
      title: "Agent name",
      type: "string",
      group: "brand",
      initialValue: "Veronica Engelage",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "brokerageName",
      title: "Brokerage name",
      type: "string",
      group: "brand",
      initialValue: "Carolina One Real Estate",
    }),

    defineField({
      name: "brandTagline",
      title: "Tagline",
      type: "string",
      group: "brand",
      initialValue:
        "Charleston & Mount Pleasant real estate, guided with discretion, local intelligence, and calm execution.",
    }),

    defineField({
      name: "primaryLocation",
      title: "Primary location",
      type: "string",
      group: "brand",
      initialValue: "Charleston & Mount Pleasant, SC",
    }),

    // Optional: small "address" field for footer, schema-safe
    defineField({
      name: "address",
      title: "Address (optional)",
      type: "string",
      group: "contact",
      description:
        "Short address for footer or contact page. Example: Mount Pleasant, SC",
    }),

    // ----------------------------
    // CONTACT
    // ----------------------------
    defineField({
      name: "phone",
      title: "Phone (E.164 preferred)",
      type: "string",
      group: "contact",
      description: "Example: +18548372944",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "license",
      title: "License number (optional)",
      type: "string",
      group: "contact",
    }),

    // ----------------------------
    // NAVIGATION
    // ----------------------------
    defineField({
      name: "headerNav",
      title: "Header menu links",
      type: "array",
      group: "nav",
      of: [
        {
          type: "object",
          name: "navItem",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link (href)",
              type: "string",
              description: "Example: /about or https://...",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
      initialValue: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
      validation: (Rule) => Rule.max(6),
    }),

    defineField({
      name: "headerCta",
      title: "Header CTA",
      type: "object",
      group: "nav",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Get in touch",
        }),
        defineField({
          name: "mode",
          title: "CTA behavior",
          type: "string",
          options: {
            list: [
              { title: "Link to page", value: "link" },
              { title: "Call phone (tel:)", value: "tel" },
              { title: "Text phone (sms:)", value: "sms" },
            ],
            layout: "radio",
          },
          initialValue: "link",
        }),

        // NEW: canonical field
        defineField({
          name: "value",
          title: "Link (href) or phone",
          type: "string",
          description:
            "If mode=link: /contact. If mode=tel or sms: +1854... (E.164 preferred).",
          initialValue: "/contact",
        }),

        // NEW: optional prefill message for sms
        defineField({
          name: "message",
          title: "SMS prefill message (optional)",
          type: "string",
          description:
            "Only used when mode=sms. If empty, a default message is used.",
          hidden: ({ parent }) => parent?.mode !== "sms",
        }),

        // TEMP: backwards-compat alias so existing studio values don't vanish immediately.
        // We'll migrate and remove this after you update queries.
        defineField({
          name: "href",
          title: "Legacy: Link (href) or phone",
          type: "string",
          hidden: true,
        }),
      ],
    }),

    defineField({
      name: "footerNav",
      title: "Footer links",
      type: "array",
      group: "nav",
      of: [
        {
          type: "object",
          name: "footerLink",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link (href)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
      initialValue: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
        { label: "Fair Housing", href: "/fair-housing" },
        { label: "Accessibility", href: "/accessibility" },
        {
          label: "Do Not Sell or Share My Personal Information",
          href: "/do-not-sell",
        },
      ],
      validation: (Rule) => Rule.max(10),
    }),

    // ----------------------------
    // SEO DEFAULTS
    // ----------------------------
    defineField({
      name: "defaultSeoTitle",
      title: "Default SEO title",
      type: "string",
      group: "seo",
      initialValue: "Veronica Engelage | Charleston & Mount Pleasant Real Estate Expert",
    }),

    defineField({
      name: "defaultSeoDescription",
      title: "Default SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      initialValue:
        "Luxury homes, waterfront properties, and expert local guidance in Charleston and Mount Pleasant. Discreet representation and calm execution.",
    }),

    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      group: "seo",
      description: "Used for canonical URLs, social cards, etc.",
      initialValue: "https://veronicachs.com",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});

export default siteSettings;
