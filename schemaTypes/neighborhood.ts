import {defineField, defineType} from 'sanity'

export const neighborhood = defineType({
  name: 'neighborhood',
  title: 'Neighborhood',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'manual',
      options: {list: [{title: 'Manual', value: 'manual'}, {title: 'Imported', value: 'import'}], layout: 'radio'},
    }),
    defineField({name: 'externalId', title: 'External ID', type: 'string'}),
    defineField({name: 'heroImage', title: 'Hero Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3}),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({name: 'seo', title: 'SEO Override', type: 'seo'}),
  ],
})
