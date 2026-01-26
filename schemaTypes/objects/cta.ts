import {defineField, defineType} from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({name: 'url', title: 'URL', type: 'url'}),
        defineField({
          name: 'page',
          title: 'Internal Page',
          type: 'reference',
          to: [{type: 'page'}, {type: 'listing'}, {type: 'neighborhood'}, {type: 'subdivision'}],
        }),
      ],
    }),
  ],
})
