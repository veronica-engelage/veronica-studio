import {defineField, defineType} from 'sanity'

export const pageSettings = defineType({
  name: 'pageSettings',
  title: 'Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageKey',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          {title: 'Markets', value: 'markets'},
          {title: 'Neighborhoods', value: 'neighborhoods'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'reference',
      to: [{type: 'imageAsset'}],
    }),
    defineField({
      name: 'introHeadline',
      title: 'Intro Headline',
      type: 'string',
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageKey: 'pageKey',
      media: 'heroImage.image',
    },
    prepare({title, pageKey, media}) {
      return {
        title,
        subtitle: pageKey ? `Page: ${pageKey}` : 'Page Settings',
        media,
      }
    },
  },
})
