import {defineField, defineType} from 'sanity'

export const sectionRichText = defineType({
  name: 'sectionRichText',
  title: 'Section: Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richContent',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      initialValue: 'normal',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Narrow', value: 'narrow'},
          {title: 'Wide', value: 'wide'},
        ],
        layout: 'radio',
      },
    }),
  ],

  preview: {
    select: {content: 'content'},
    prepare({content}) {
      const text =
        content?.find((b: any) => b._type === 'block')?.children?.[0]?.text
      return {title: text || 'Rich Text'}
    },
  },
})
