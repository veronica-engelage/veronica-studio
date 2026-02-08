import {defineField, defineType} from 'sanity'

export const sectionIdxWidget = defineType({
  name: 'sectionIdxWidget',
  title: 'Section: IDX Widget',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'widgetId',
      title: 'Widget ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'widgetHost',
      title: 'Widget Host',
      type: 'string',
      description:
        'IDX widget host (e.g. demoidxbroker.idxbroker.com or your custom subdomain).',
      initialValue: 'demoidxbroker.idxbroker.com',
    }),
  ],
  preview: {
    select: {title: 'title', widgetId: 'widgetId'},
    prepare({title, widgetId}) {
      return {
        title: title || 'IDX Widget',
        subtitle: widgetId ? `Widget ${widgetId}` : 'Widget ID required',
      }
    },
  },
})
