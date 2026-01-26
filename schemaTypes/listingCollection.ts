import {defineField, defineType} from 'sanity'

export const listingCollection = defineType({
  name: 'listingCollection',
  title: 'Listing Collection',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'type',
      title: 'Collection Type',
      type: 'string',
      initialValue: 'featured',
      options: {
        list: [
          {title: 'Featured', value: 'featured'},
          {title: 'Campaign', value: 'campaign'},
          {title: 'Category', value: 'category'},
          {title: 'Manual Picks', value: 'manual'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),

    defineField({
      name: 'items',
      title: 'Listings',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'listing'}]}],
      validation: (Rule) => Rule.min(1),
    }),

    defineField({
      name: 'showOnlyStatuses',
      title: 'Filter Statuses (optional)',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Coming Soon', value: 'comingSoon'},
          {title: 'Active', value: 'active'},
          {title: 'Under Contract', value: 'underContract'},
          {title: 'Pending', value: 'pending'},
          {title: 'Sold', value: 'sold'},
          {title: 'Off Market', value: 'offMarket'},
          {title: 'Rental', value: 'rental'},
        ],
        layout: 'tags',
      },
      description: 'Optional: frontend can hide non-matching listings.',
    }),
  ],

  preview: {
    select: {title: 'title', type: 'type'},
    prepare({title, type}) {
      return {title, subtitle: `Listing Collection • ${type || 'collection'}`}
    },
  },
})
