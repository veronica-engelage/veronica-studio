import {defineField, defineType} from 'sanity'

export const sectionListings = defineType({
  name: 'sectionListings',
  title: 'Section: Listings',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'mode',
      title: 'Mode',
      type: 'string',
      initialValue: 'collection',
      options: {
        list: [
          {title: 'Use a Collection', value: 'collection'},
          {title: 'Filter (dynamic)', value: 'filter'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'collection',
      title: 'Listing Collection',
      type: 'reference',
      to: [{type: 'listingCollection'}],
      hidden: ({parent}) => parent?.mode !== 'collection',
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const mode = (ctx.parent as any)?.mode
          if (mode === 'collection' && !value) return 'Collection is required in Collection mode.'
          return true
        }),
    }),

    defineField({
      name: 'filters',
      title: 'Filters',
      type: 'object',
      hidden: ({parent}) => parent?.mode !== 'filter',
      fields: [
        defineField({
          name: 'neighborhood',
          title: 'Neighborhood',
          type: 'reference',
          to: [{type: 'neighborhood'}],
        }),
        defineField({
          name: 'subdivision',
          title: 'Subdivision',
          type: 'reference',
          to: [{type: 'subdivision'}],
        }),
        defineField({
          name: 'statuses',
          title: 'Statuses',
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
        }),
        defineField({
          name: 'limit',
          title: 'Limit',
          type: 'number',
          initialValue: 6,
          validation: (Rule) => Rule.min(1).max(24),
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', mode: 'mode'},
    prepare({title, mode}) {
      return {title: title || 'Listings', subtitle: mode || ''}
    },
  },
})
