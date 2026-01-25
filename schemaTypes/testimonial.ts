import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Client Name', type: 'string' }),
    defineField({ name: 'text', title: 'Testimonial', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'transactionType',
      title: 'Transaction Type',
      type: 'string',
      options: {
        list: [
          {title: 'Buyer', value: 'buyer'},
          {title: 'Seller', value: 'seller'},
        ],
      },
    }),
  ],
})
