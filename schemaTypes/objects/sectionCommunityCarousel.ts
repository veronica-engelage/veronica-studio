import {defineField, defineType} from 'sanity'

export const sectionCommunityCarousel = defineType({
  name: 'sectionCommunityCarousel',
  title: 'Community Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Markets',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Community Market Guides',
    }),
    defineField({
      name: 'mode',
      title: 'Content Type',
      type: 'string',
      initialValue: 'markets',
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
      name: 'markets',
      title: 'Selected Markets',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'market'}]}],
      description: 'Optional. Leave empty to show all markets.',
      hidden: ({parent}) => parent?.mode !== 'markets',
    }),
    defineField({
      name: 'neighborhoods',
      title: 'Selected Neighborhoods',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'neighborhood'}]}],
      description: 'Optional. Leave empty to show all neighborhoods.',
      hidden: ({parent}) => parent?.mode !== 'neighborhoods',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      mode: 'mode',
    },
    prepare({title, mode}) {
      return {
        title: title || 'Community Carousel',
        subtitle: mode === 'neighborhoods' ? 'Neighborhoods' : 'Markets',
      }
    },
  },
})
