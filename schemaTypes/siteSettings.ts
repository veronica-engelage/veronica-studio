import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'brandName', title: 'Brand Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Office Address', type: 'text' }),
    defineField({ name: 'defaultSeoTitle', title: 'Default SEO Title', type: 'string' }),
    defineField({ name: 'defaultSeoDescription', title: 'Default SEO Description', type: 'text' }),
  ],
})
