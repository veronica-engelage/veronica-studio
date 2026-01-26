import {defineArrayMember, defineType} from 'sanity'

export const richContent = defineType({
  name: 'richContent',
  title: 'Rich Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
      marks: {
        decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
        annotations: [
          defineArrayMember({
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [{name: 'href', type: 'url', title: 'URL'}],
          }),
        ],
      },
    }),
  ],
})
