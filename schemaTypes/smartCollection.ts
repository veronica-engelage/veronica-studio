import {defineField, defineType} from 'sanity'

export const socialCollection = defineType({
  name: 'socialCollection',
  title: 'Social Collection',
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
      name: 'items',
      title: 'Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'socialPost'}]}],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})
