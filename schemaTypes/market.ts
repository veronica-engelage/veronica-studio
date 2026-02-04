import {defineField, defineType} from 'sanity'

export const market = defineType({
  name: 'market',
  title: 'Market',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Market Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers show first.',
      initialValue: 10,
    }),
    defineField({
      name: 'municipality',
      title: 'Municipality Key',
      type: 'string',
      description: 'Used to link neighborhoods in this market.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'reference',
      to: [{type: 'imageAsset'}],
      description: 'Optional. If empty, a default hero is used.',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short SEO-friendly blurb.',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'richContent',
      description: 'Editorial overview for the market page.',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      order: 'order',
    },
    prepare({title, order}) {
      return {
        title: title || 'Market',
        subtitle: typeof order === 'number' ? `Order ${order}` : '',
      }
    },
  },
})
