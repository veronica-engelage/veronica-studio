import {defineField, defineType} from 'sanity'

export const imageAsset = defineType({
  name: 'imageAsset',
  title: 'Image Asset',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'assetType',
      title: 'Asset Type',
      type: 'string',
      initialValue: 'photo',
      options: {
        list: [
          {title: 'Photo', value: 'photo'},
          {title: 'Graphic', value: 'graphic'},
          {title: 'Icon', value: 'icon'},
          {title: 'Floorplan', value: 'floorplan'},
          {title: 'Map', value: 'map'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Accessibility text',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'credits',
      title: 'Copyright & Credits',
      type: 'object',
      fields: [
        defineField({name: 'author', title: 'Author / Photographer', type: 'string'}),
        defineField({name: 'copyrightNotice', title: 'Copyright Notice', type: 'string'}),
        defineField({
          name: 'license',
          title: 'License',
          type: 'string',
          initialValue: 'unknown',
          options: {
            list: [
              {title: 'Owned', value: 'owned'},
              {title: 'Licensed', value: 'licensed'},
              {title: 'MLS Use', value: 'mls'},
              {title: 'Stock', value: 'stock'},
              {title: 'Unknown', value: 'unknown'},
            ],
          },
        }),
        defineField({
          name: 'creditRequired',
          title: 'Credit Required',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'usageNotes',
          title: 'Usage Notes',
          type: 'text',
          rows: 2,
        }),
      ],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),

    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'manual',
      options: {
        list: [
          {title: 'Manual', value: 'manual'},
          {title: 'MLS', value: 'mls'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'Vendor', value: 'vendor'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      assetType: 'assetType',
    },
    prepare({title, media, assetType}) {
      return {
        title,
        subtitle: assetType,
        media,
      }
    },
  },
})
