import {defineField, defineType} from 'sanity'

export const listing = defineType({
  name: 'listing',
  title: 'Listing',
  type: 'document',

  fields: [
    // -------- Identity / URL --------
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal/marketing title (often the address).',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'active',
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
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      initialValue: 'singleFamily',
      options: {
        list: [
          {title: 'Single Family', value: 'singleFamily'},
          {title: 'Condo', value: 'condo'},
          {title: 'Townhome', value: 'townhome'},
          {title: 'Land', value: 'land'},
          {title: 'Multi-Family', value: 'multiFamily'},
          {title: 'Rental', value: 'rental'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // -------- Source / MLS futureproofing --------
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'manual',
      options: {
        list: [
          {title: 'Manual', value: 'manual'},
          {title: 'MLS', value: 'mls'},
          {title: 'Realtor.com', value: 'realtor'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'externalIds',
      title: 'External IDs',
      type: 'object',
      fields: [
        defineField({name: 'mlsId', title: 'MLS ID', type: 'string'}),
        defineField({name: 'realtorId', title: 'Realtor.com ID', type: 'string'}),
        defineField({name: 'sourceSystemId', title: 'Source System ID', type: 'string'}),
      ],
    }),

    defineField({
      name: 'updatedAtSource',
      title: 'Updated At (Source)',
      type: 'datetime',
      description: 'When the source feed last updated this listing (for future sync).',
    }),

    defineField({
      name: 'rawSource',
      title: 'Raw Source Snapshot',
      type: 'text',
      rows: 6,
      description: 'Optional: store a compact JSON snapshot from MLS ingestion for debugging/compliance.',
    }),

    // -------- Location --------
    defineField({name: 'address', title: 'Address', type: 'address'}),

    defineField({
      name: 'neighborhood',
      title: 'Neighborhood',
      type: 'reference',
      to: [{type: 'neighborhood'}],
      description: 'Optional but recommended for SEO and navigation.',
    }),

    defineField({
      name: 'subdivision',
      title: 'Subdivision',
      type: 'reference',
      to: [{type: 'subdivision'}],
      description: 'Optional. Subdivision belongs to a neighborhood.',
    }),

    defineField({
      name: 'geo',
      title: 'Geo Location',
      type: 'object',
      fields: [
        defineField({name: 'lat', title: 'Latitude', type: 'number'}),
        defineField({name: 'lng', title: 'Longitude', type: 'number'}),
      ],
    }),

    // -------- Numbers / facts --------
    defineField({name: 'price', title: 'Price', type: 'price'}),
    defineField({name: 'bedrooms', title: 'Bedrooms', type: 'number'}),
    defineField({name: 'bathrooms', title: 'Bathrooms', type: 'number'}),
    defineField({name: 'sqft', title: 'Square Feet', type: 'number'}),
    defineField({name: 'acres', title: 'Acres', type: 'number'}),
    defineField({name: 'yearBuilt', title: 'Year Built', type: 'number'}),

    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Low-effort bullets that look good everywhere.',
    }),

    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),

    // -------- Marketing content --------
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short intro used in cards/SEO. If empty, frontend can generate.',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'richContent',
      description: 'Longer marketing description.',
    }),

    // -------- Media --------
    defineField({
      name: 'heroMedia',
      title: 'Hero Media',
      type: 'reference',
      to: [{type: 'imageAsset'}, {type: 'videoAsset'}],
      description: 'Primary hero visual (recommended).',
    }),

    defineField({
      name: 'media',
      title: 'Media Gallery',
      type: 'array',
      of: [{type: 'listingMedia'}],
      description: 'Attach photos/videos with captions + categories.',
    }),

    defineField({
      name: 'documents',
      title: 'Documents',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'documentAsset'}]}],
      description: 'Brochure, disclosures, printable details, etc.',
    }),

    // -------- Open houses --------
    defineField({
      name: 'openHouses',
      title: 'Open Houses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'start', title: 'Start', type: 'datetime', validation: (Rule) => Rule.required()},
            {name: 'end', title: 'End', type: 'datetime'},
            {name: 'note', title: 'Note', type: 'string'},
          ],
          preview: {
            select: {start: 'start', note: 'note'},
            prepare({start, note}) {
              return {title: note || 'Open House', subtitle: start ? new Date(start).toLocaleString() : ''}
            },
          },
        },
      ],
    }),

    // -------- SEO --------
    defineField({name: 'seo', title: 'SEO Override', type: 'seo'}),

    // -------- Lead capture linkage (optional but handy) --------
    defineField({
      name: 'leadFormKey',
      title: 'Lead Form Key',
      type: 'reference',
      to: [{type: 'formDefinition'}],
      description: 'Optional: which form to use on this listing page.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      status: 'status',
      media: 'heroMedia.image',
      heroImageAsset: 'heroMedia.image',
      heroThumb: 'heroMedia.thumbnail',
    },
    prepare(selection) {
      const {title, status, heroImageAsset, heroThumb} = selection as any
      return {
        title: title || 'Untitled listing',
        subtitle: status ? `Listing • ${status}` : 'Listing',
        media: heroImageAsset || heroThumb,
      }
    },
  },
})
