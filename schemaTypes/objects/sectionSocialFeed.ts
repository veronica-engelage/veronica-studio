import {defineField, defineType} from 'sanity'

export const sectionSocialFeed = defineType({
  name: 'sectionSocialFeed',
  title: 'Section: Social Feed',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', initialValue: 'From Instagram'}),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      initialValue: 'instagram',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'TikTok', value: 'tiktok'},
          {title: 'YouTube', value: 'youtube'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'mode',
      title: 'Mode',
      type: 'string',
      initialValue: 'latest',
      options: {
        list: [
          {title: 'Latest posts', value: 'latest'},
          {title: 'Manual selection', value: 'manual'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'limit',
      title: 'Limit',
      type: 'number',
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(24),
      hidden: ({parent}) => parent?.mode !== 'latest',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'socialPost'}]}],
      hidden: ({parent}) => parent?.mode !== 'manual',
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const mode = (ctx.parent as any)?.mode
          if (mode === 'manual' && (!value || (value as any[]).length === 0))
            return 'Pick at least one post in Manual mode.'
          return true
        }),
    }),
  ],
  preview: {
    select: {title: 'title', platform: 'platform', mode: 'mode'},
    prepare({title, platform, mode}) {
      return {title: title || 'Social Feed', subtitle: `${platform || ''} • ${mode || ''}`.trim()}
    },
  },
})
