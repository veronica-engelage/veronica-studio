import {defineField, defineType} from 'sanity'

export const leadInquiry = defineType({
  name: 'leadInquiry',
  title: 'Lead Inquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'lead',
      title: 'Lead',
      type: 'reference',
      to: [{type: 'lead'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'kind',
      title: 'Inquiry Type',
      type: 'string',
      initialValue: 'contact',
      options: {
        list: [
          {title: 'General Contact', value: 'contact'},
          {title: 'Listing Inquiry', value: 'listing'},
          {title: 'Buyer Consultation', value: 'buyerConsult'},
          {title: 'Seller Consultation', value: 'sellerConsult'},
          {title: 'Home Valuation', value: 'valuation'},
          {title: 'Open House', value: 'openHouse'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(5),
    }),

    // Context: what page/listing triggered it
    defineField({
      name: 'context',
      title: 'Context',
      type: 'object',
      fields: [
        defineField({name: 'pageUrl', title: 'Page URL', type: 'url'}),
        defineField({name: 'referrer', title: 'Referrer', type: 'url'}),
        defineField({name: 'utmSource', title: 'UTM Source', type: 'string'}),
        defineField({name: 'utmMedium', title: 'UTM Medium', type: 'string'}),
        defineField({name: 'utmCampaign', title: 'UTM Campaign', type: 'string'}),

        defineField({name: 'neighborhood', title: 'Neighborhood', type: 'reference', to: [{type: 'neighborhood'}]}),
        defineField({name: 'subdivision', title: 'Subdivision', type: 'reference', to: [{type: 'subdivision'}]}),
        defineField({name: 'listing', title: 'Listing', type: 'reference', to: [{type: 'listing'}]}),
      ],
    }),

    defineField({name: 'submittedAt', title: 'Submitted At', type: 'datetime', validation: (Rule) => Rule.required()}),

    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'website',
      options: {
        list: [
          {title: 'Website', value: 'website'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'Open House', value: 'openHouse'},
          {title: 'Phone Call', value: 'phone'},
          {title: 'Email', value: 'email'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),

    // CRM sync tracking per inquiry (optional but useful)
    defineField({
      name: 'crmSync',
      title: 'CRM Sync',
      type: 'object',
      fields: [
        defineField({
          name: 'syncStatus',
          title: 'Sync Status',
          type: 'string',
          initialValue: 'notSynced',
          options: {
            list: [
              {title: 'Not synced', value: 'notSynced'},
              {title: 'Queued', value: 'queued'},
              {title: 'Synced', value: 'synced'},
              {title: 'Error', value: 'error'},
            ],
          },
        }),
        defineField({name: 'externalId', title: 'CRM External ID', type: 'string'}),
        defineField({name: 'lastError', title: 'Last Error', type: 'text', rows: 2}),
      ],
    }),
  ],

  preview: {
    select: {kind: 'kind', submittedAt: 'submittedAt', leadName: 'lead.firstName', leadEmail: 'lead.email'},
    prepare({kind, submittedAt, leadName, leadEmail}) {
      const who = leadName || leadEmail || 'Lead'
      return {title: `${who}`, subtitle: `Inquiry • ${kind} • ${submittedAt ? new Date(submittedAt).toLocaleDateString() : ''}`}
    },
  },
})
