import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'SEO Title', type: 'string'}),
    defineField({name: 'description', title: 'Meta Description', type: 'text', rows: 3}),
    defineField({name: 'ogImage', title: 'OG Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'noIndex', title: 'No Index', type: 'boolean', initialValue: false}),
    defineField({name: 'canonicalUrl', title: 'Canonical URL', type: 'url'}),
  ],
})
