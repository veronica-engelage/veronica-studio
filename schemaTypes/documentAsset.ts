import {defineField, defineType} from 'sanity'

export const documentAsset = defineType({
  name: 'documentAsset',
  title: 'Document Asset',
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
      initialValue: 'pdf',
      options: {
        list: [
          {title: 'PDF', value: 'pdf'},
          {title: 'Disclosure', value: 'disclosure'},
          {title: 'Guide', value: 'guide'},
          {title: 'Checklist', value: 'checklist'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      validation: (Rule) => Rule.required(),
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
        defineField({name: 'author', title: 'Author', type: 'string'}),
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
      ],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
  ],

  preview: {
    select: {
      title: 'title',
      file: 'file',
    },
    prepare({title}) {
      return {
        title,
        subtitle: 'Document',
      }
    },
  },
})
