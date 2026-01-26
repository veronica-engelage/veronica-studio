import {defineField, defineType} from 'sanity'

export const lead = defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Qualified', value: 'qualified'},
          {title: 'In Progress', value: 'inProgress'},
          {title: 'Closed', value: 'closed'},
          {title: 'Unqualified', value: 'unqualified'},
          {title: 'Spam', value: 'spam'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({name: 'firstName', title: 'First Name', type: 'string'}),
    defineField({name: 'lastName', title: 'Last Name', type: 'string'}),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((v) => (!v || /^\S+@\S+\.\S+$/.test(v) ? true : 'Invalid email')),
    }),

    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Store as entered. Normalize later in CRM pipeline.',
    }),

    defineField({
      name: 'preferredContact',
      title: 'Preferred Contact',
      type: 'string',
      initialValue: 'either',
      options: {
        list: [
          {title: 'Email', value: 'email'},
          {title: 'Phone', value: 'phone'},
          {title: 'Either', value: 'either'},
        ],
      },
    }),

    defineField({
      name: 'leadType',
      title: 'Lead Type',
      type: 'string',
      options: {
        list: [
          {title: 'Buyer', value: 'buyer'},
          {title: 'Seller', value: 'seller'},
          {title: 'Both', value: 'both'},
          {title: 'Investor', value: 'investor'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),

    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      description: 'Keep this professional. Assume it could be exported later.',
    }),

    // Context: what interested them
    defineField({
      name: 'interests',
      title: 'Interests',
      type: 'object',
      fields: [
        defineField({
          name: 'neighborhoods',
          title: 'Neighborhoods',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'neighborhood'}]}],
        }),
        defineField({
          name: 'subdivisions',
          title: 'Subdivisions',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'subdivision'}]}],
        }),
        defineField({
          name: 'listings',
          title: 'Listings',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'listing'}]}],
        }),
      ],
    }),

    // Consent + compliance
    defineField({
      name: 'consent',
      title: 'Consent',
      type: 'object',
      fields: [
        defineField({name: 'marketingOptIn', title: 'Marketing Opt-in', type: 'boolean', initialValue: false}),
        defineField({name: 'consentText', title: 'Consent Text (captured)', type: 'text', rows: 2}),
        defineField({name: 'consentTimestamp', title: 'Consent Timestamp', type: 'datetime'}),
      ],
    }),

    // CRM sync tracking (futureproof)
    defineField({
      name: 'crmSync',
      title: 'CRM Sync',
      type: 'object',
      fields: [
        defineField({name: 'target', title: 'Target CRM', type: 'string', description: 'e.g. FollowUpBoss'}),
        defineField({name: 'externalId', title: 'CRM External ID', type: 'string'}),
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
        defineField({name: 'lastAttemptAt', title: 'Last Attempt', type: 'datetime'}),
        defineField({name: 'lastError', title: 'Last Error', type: 'text', rows: 2}),
      ],
    }),
  ],

  preview: {
    select: {firstName: 'firstName', lastName: 'lastName', email: 'email', status: 'status'},
    prepare({firstName, lastName, email, status}) {
      const name = [firstName, lastName].filter(Boolean).join(' ') || email || 'Unnamed lead'
      return {title: name, subtitle: `Lead • ${status}`}
    },
  },
})