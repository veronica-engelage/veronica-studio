import {defineField, defineType} from 'sanity'

export const subdivision = defineType({
  name: 'subdivision',
  title: 'Subdivision',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'externalId',
      title: 'External ID (for automation)',
      type: 'string',
      description: 'Used later for MLS / data feeds',
    }),
    defineField({
      name: 'marketStats',
      title: 'Market Stats',
      type: 'object',
      fields: [
        {name: 'medianPrice', title: 'Median Price', type: 'number'},
        {name: 'daysOnMarket', title: 'Days on Market', type: 'number'},
        {name: 'trend', title: 'Trend', type: 'string'},
        {name: 'lastUpdated', title: 'Last Updated', type: 'datetime'},
      ],
    }),
    defineField({
      name: 'aiSummary',
      title: 'AI Summary',
      type: 'text',
      description: 'Generated later via automation',
    }),
  ],
})
