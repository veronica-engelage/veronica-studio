import {defineField, defineType} from 'sanity'

export const sectionSnippet = defineType({
  name: 'sectionSnippet',
  title: 'Section: Snippet',
  type: 'object',
  fields: [
    defineField({
      name: 'snippet',
      title: 'Snippet',
      type: 'reference',
      to: [{type: 'snippet'}],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {title: 'snippet.title'},
    prepare({title}) {
      return {title: title || 'Snippet'}
    },
  },
})
