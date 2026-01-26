import {defineField, defineType} from 'sanity'

export const address = defineType({
  name: 'address',
  title: 'Address',
  type: 'object',
  fields: [
    defineField({name: 'street1', title: 'Street 1', type: 'string'}),
    defineField({name: 'street2', title: 'Street 2', type: 'string'}),
    defineField({name: 'city', title: 'City', type: 'string'}),
    defineField({name: 'state', title: 'State', type: 'string', initialValue: 'SC'}),
    defineField({name: 'zip', title: 'ZIP', type: 'string'}),
  ],
})
