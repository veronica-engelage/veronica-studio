import {defineField, defineType} from 'sanity'

export const sectionLeadForm = defineType({
  name: 'sectionLeadForm',
  title: 'Section: Lead Form',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', initialValue: 'Get in touch'}),
    defineField({name: 'intro', title: 'Intro Text', type: 'text', rows: 3}),
    defineField({
      name: 'form',
      title: 'Form Definition',
      type: 'reference',
      to: [{type: 'formDefinition'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: 'Thanks. We’ll reach out shortly.',
    }),
  ],
  preview: {
    select: {title: 'title', formTitle: 'form.title'},
    prepare({title, formTitle}) {
      return {title: title || 'Lead Form', subtitle: formTitle ? `Form: ${formTitle}` : 'Form'}
    },
  },
})
