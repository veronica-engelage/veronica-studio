import {defineField, defineType} from 'sanity'

export const sectionGallery = defineType({
  name: 'sectionGallery',
  title: 'Section: Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'items',
      title: 'Gallery Items',
      type: 'array',
      of: [
        {
          name: 'imageRef',
          type: 'reference',
          to: [{type: 'imageAsset'}],
        },
        {
          name: 'videoRef',
          type: 'reference',
          to: [{type: 'videoAsset'}],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'grid',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Carousel', value: 'carousel'},
          {title: 'Masonry', value: 'masonry'},
        ],
        layout: 'radio',
      },
    }),
  ],

  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Gallery'}
    },
  },
})
