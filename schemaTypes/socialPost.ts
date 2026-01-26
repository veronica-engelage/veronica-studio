import {defineField, defineType} from 'sanity'

export const socialPost = defineType({
  name: 'socialPost',
  title: 'Social Post',
  type: 'document',

  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      initialValue: 'instagram',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'TikTok', value: 'tiktok'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'externalId',
      title: 'External ID',
      type: 'string',
      description: 'Stable ID from the platform (used for import/upsert).',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'permalink',
      title: 'Permalink',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 6,
    }),

    defineField({
      name: 'postedAt',
      title: 'Posted At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Carousel', value: 'carousel'},
          {title: 'Video', value: 'video'},
          {title: 'Reel', value: 'reel'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
  name: 'mediaAssets',
  title: 'Media Assets',
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
  description:
    'Optional now. Later your importer can create imageAsset/videoAsset docs and link them here.',
}),

    defineField({
      name: 'hashtags',
      title: 'Hashtags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),

    defineField({
      name: 'mentions',
      title: 'Mentions',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'imported',
      options: {
        list: [
          {title: 'Imported', value: 'imported'},
          {title: 'Curated', value: 'curated'},
          {title: 'Hidden', value: 'hidden'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'related',
      title: 'Related Content',
      type: 'object',
      fields: [
        defineField({
          name: 'listings',
          title: 'Listings',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'listing'}]}],
        }),
        defineField({
          name: 'neighborhoods',
          title: 'Neighborhoods',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'neighborhood'}]}],
        }),
        defineField({
          name: 'subdivisions',
          title: 'Subdivisions',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'subdivision'}]}],
        }),
      ],
    }),

    defineField({
      name: 'sync',
      title: 'Import/Sync',
      type: 'object',
      fields: [
        defineField({
          name: 'source',
          title: 'Source',
          type: 'string',
          initialValue: 'import',
          options: {list: [{title: 'Import', value: 'import'}, {title: 'Manual', value: 'manual'}]},
        }),
        defineField({
          name: 'syncStatus',
          title: 'Sync Status',
          type: 'string',
          initialValue: 'ok',
          options: {
            list: [
              {title: 'OK', value: 'ok'},
              {title: 'Queued', value: 'queued'},
              {title: 'Error', value: 'error'},
            ],
          },
        }),
        defineField({name: 'lastSyncedAt', title: 'Last Synced At', type: 'datetime'}),
        defineField({name: 'lastError', title: 'Last Error', type: 'text', rows: 2}),
      ],
    }),
  ],

  preview: {
    select: {title: 'caption', platform: 'platform', media: 'mediaAssets.0.image', postedAt: 'postedAt'},
    prepare({title, platform, postedAt, media}) {
      const short = title ? String(title).slice(0, 60) : 'Social Post'
      const date = postedAt ? new Date(postedAt).toLocaleDateString() : ''
      return {
        title: short,
        subtitle: `${platform || 'social'} • ${date}`,
        media,
      }
    },
  },
})
