import {defineField, defineType} from 'sanity'

export const price = defineType({
  name: 'price',
  title: 'Price',
  type: 'object',
  fields: [
    defineField({name: 'amount', title: 'Amount', type: 'number', validation: (Rule) => Rule.min(0)}),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      options: {list: [{title: 'USD', value: 'USD'}]},
    }),
    defineField({
      name: 'display',
      title: 'Display Override',
      type: 'string',
      description: 'Optional: e.g. "Contact for price" or "From the $900s".',
    }),
  ],
})
