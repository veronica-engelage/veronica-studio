import {defineField, defineType} from 'sanity'

export const listingMedia = defineType({
  name: 'listingMedia',
  title: 'Listing Media',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      title: 'Asset',
      type: 'reference',
      to: [{type: 'imageAsset'}, {type: 'videoAsset'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'interior',
      options: {
        list: [
          {title: 'Exterior', value: 'exterior'},
          {title: 'Interior', value: 'interior'},
          {title: 'Kitchen', value: 'kitchen'},
          {title: 'Bathroom', value: 'bathroom'},
          {title: 'Aerial', value: 'aerial'},
          {title: 'Floorplan', value: 'floorplan'},
          {title: 'Neighborhood', value: 'neighborhood'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),

    defineField({name: 'caption', title: 'Caption', type: 'string'}),
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number'}),
  ],
  preview: {
    select: {
      title: 'caption',
      category: 'category',
      assetTitle: 'asset.title',
    },
    prepare({title, category, assetTitle}) {
      return {
        title: title || assetTitle || 'Media',
        subtitle: category ? `Listing Media • ${category}` : 'Listing Media',
      }
    },
  },
})
