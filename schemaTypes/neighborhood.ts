import {defineField, defineType} from 'sanity'

export const neighborhood = defineType({
  name: 'neighborhood',
  title: 'Neighborhood',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'municipality',
      title: 'Municipality',
      type: 'string',
      initialValue: 'Mount Pleasant',
      description: 'Used for URL pattern: /neighborhoods/[name]-[municipality].',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Header Image',
      type: 'reference',
      to: [{type: 'imageAsset'}],
      description: 'Primary header image for the neighborhood page.',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Optional. If empty, defaults to “[Name] Real Estate”.',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'manual',
      options: {list: [{title: 'Manual', value: 'manual'}, {title: 'Imported', value: 'import'}], layout: 'radio'},
    }),
    defineField({name: 'externalId', title: 'External ID', type: 'string'}),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short overview used for previews and SEO.',
    }),
    defineField({
      name: 'overview',
      title: 'Neighborhood Overview',
      type: 'richContent',
      description: 'Warm, factual overview. Acts as the main body copy.',
    }),
    defineField({
      name: 'lifestyle',
      title: 'Lifestyle & Vibe',
      type: 'richContent',
    }),
    defineField({
      name: 'schools',
      title: 'Schools',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'schoolEntry',
          fields: [
            defineField({name: 'name', title: 'School Name', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({
              name: 'level',
              title: 'Level',
              type: 'string',
              options: {
                list: [
                  {title: 'Elementary', value: 'Elementary'},
                  {title: 'Middle', value: 'Middle'},
                  {title: 'High', value: 'High'},
                  {title: 'K-8', value: 'K-8'},
                  {title: 'K-12', value: 'K-12'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Public', value: 'Public'},
                  {title: 'Charter', value: 'Charter'},
                  {title: 'Private', value: 'Private'},
                  {title: 'Magnet', value: 'Magnet'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'ratingLabel',
              title: 'SC Report Card Rating (Label)',
              type: 'string',
              description: 'Optional. Example: Excellent, Good, Average.',
            }),
            defineField({
              name: 'ratingValue',
              title: 'SC Report Card Rating (Value)',
              type: 'number',
              description: 'Optional numeric rating if you use it (e.g., 0-100 or 1-5).',
            }),
            defineField({
              name: 'ratingYear',
              title: 'Rating Year',
              type: 'string',
              description: 'Optional. Example: 2023-24.',
            }),
            defineField({
              name: 'sourceUrl',
              title: 'Source URL',
              type: 'url',
              description: 'Link to the official SC Report Cards page for this school.',
            }),
            defineField({
              name: 'qualitativeNote',
              title: 'Qualitative Note',
              type: 'string',
              description: 'Optional. Example: STEM focus, arts-forward, strong athletics.',
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'level'},
            prepare({title, subtitle}) {
              return {title: title || 'School', subtitle: subtitle || ''}
            },
          },
        },
      ],
      description: 'Optional. Schools mapped to this neighborhood.',
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities & Landmarks',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'buyerInsights',
      title: 'Insights for Buyers',
      type: 'richContent',
    }),
    defineField({
      name: 'sellerInsights',
      title: 'Insights for Sellers',
      type: 'richContent',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'map',
      title: 'Map Settings',
      type: 'object',
      fields: [
        defineField({name: 'centerLat', title: 'Center Latitude', type: 'number'}),
        defineField({name: 'centerLng', title: 'Center Longitude', type: 'number'}),
        defineField({name: 'zoom', title: 'Zoom', type: 'number', initialValue: 12}),
        defineField({
          name: 'boundaryGeoJsonUrl',
          title: 'Boundary GeoJSON URL',
          type: 'url',
          description: 'Optional. Used later for precise boundaries.',
        }),
      ],
    }),
    defineField({
      name: 'zipMappings',
      title: 'ZIP Mappings',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'zipMapping',
          fields: [
            defineField({
              name: 'zip',
              title: 'ZIP Code',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'weight',
              title: 'Weight',
              type: 'number',
              description: 'Use 1 for single ZIP. For multi-ZIP, weights should sum to 1.',
              initialValue: 1,
              validation: (Rule) => Rule.min(0).max(1),
            }),
          ],
          preview: {
            select: {zip: 'zip', weight: 'weight'},
            prepare({zip, weight}) {
              return {title: zip || 'ZIP', subtitle: weight ? `Weight ${weight}` : ''}
            },
          },
        },
      ],
      description: 'Used to roll up ZIP-level market stats.',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string'}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 3}),
          ],
        },
      ],
    }),
    defineField({name: 'seo', title: 'SEO Override', type: 'seo'}),
  ],
})
