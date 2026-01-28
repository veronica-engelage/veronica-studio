import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
  name: 'sections',
  title: 'Sections',
  type: 'array',
  of: [
    {type: 'sectionHero'},
    {type: 'sectionRichText'},
    {type: 'sectionGallery'},
    {type: 'sectionSnippet'},
    {type: 'sectionCta'},
    {type: 'sectionListings'},
    {type: 'sectionSocialFeed'},
    {type: 'sectionLeadForm'},
    {type: 'sectionTestimonials'},
  ],
  validation: (Rule) => Rule.required().min(1),
}),

    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
