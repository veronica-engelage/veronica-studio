import {defineField, defineType} from 'sanity'

export const formDefinition = defineType({
  name: 'formDefinition',
  title: 'Form Definition',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Key',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Form Type',
      type: 'string',
      options: {list: [
        {title: 'Contact', value: 'contact'},
        {title: 'Listing Inquiry', value: 'listing'},
        {title: 'Home Valuation', value: 'valuation'},
        {title: 'Newsletter', value: 'newsletter'},
      ]},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'consentText',
      title: 'Consent Text',
      type: 'text',
      rows: 3,
      description: 'What the user agrees to (captured on submit).',
    }),
    defineField({
      name: 'submitCta',
      title: 'Submit Button Label',
      type: 'string',
      initialValue: 'Send',
    }),
  ],
})
