import {defineField, defineType} from 'sanity'

export const videoAsset = defineType({
  name: 'videoAsset',
  title: 'Video Asset',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      initialValue: 'youtube',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'Matterport', value: 'matterport'},
          {title: 'Other URL', value: 'url'},
          {title: 'Uploaded File', value: 'file'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      hidden: ({parent}) => parent?.provider === 'file',
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const provider = (ctx.parent as any)?.provider
          if (provider !== 'file' && !value) {
            return 'URL required unless using uploaded file'
          }
          return true
        }),
    }),

    defineField({
      name: 'file',
      title: 'Uploaded Video',
      type: 'file',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.provider !== 'file',
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const provider = (ctx.parent as any)?.provider
          if (provider === 'file' && !value) {
            return 'Video file required'
          }
          return true
        }),
    }),

    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    }),

    defineField({
      name: 'credits',
      title: 'Copyright & Credits',
      type: 'object',
      fields: [
        defineField({name: 'author', title: 'Creator / Videographer', type: 'string'}),
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
      media: 'thumbnail',
      provider: 'provider',
    },
    prepare({title, media, provider}) {
      return {
        title,
        subtitle: provider,
        media,
      }
    },
  },
})
