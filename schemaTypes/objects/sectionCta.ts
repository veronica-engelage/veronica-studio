import {defineField, defineType} from 'sanity'

export const sectionCta = defineType({
  name: 'sectionCta',
  title: 'Section: CTA',
  type: 'object',
  fields: [
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
    defineField({name: 'cta', title: 'CTA', type: 'cta'}),
  ],
  preview: {
    select: {title: 'headline'},
    prepare({title}) {
      return {title: title || 'CTA'}
    },
  },
})
