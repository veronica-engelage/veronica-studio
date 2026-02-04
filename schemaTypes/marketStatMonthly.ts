import {defineField, defineType} from 'sanity'

export const marketStatMonthly = defineType({
  name: 'marketStatMonthly',
  title: 'Market Stat (Monthly)',
  type: 'document',
  fields: [
    defineField({
      name: 'zip',
      title: 'ZIP Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'month',
      title: 'Month',
      type: 'date',
      options: {dateFormat: 'YYYY-MM'},
      validation: (Rule) => Rule.required(),
    }),

    defineField({name: 'medianListingPrice', title: 'Median Listing Price', type: 'number'}),
    defineField({name: 'medianListingPriceYoY', title: 'Median Listing Price YoY (%)', type: 'number'}),
    defineField({name: 'medianListingPriceMoM', title: 'Median Listing Price MoM (%)', type: 'number'}),
    defineField({name: 'pricePerSqft', title: 'Price Per Sqft', type: 'number'}),
    defineField({name: 'activeListingCount', title: 'Active Listing Count', type: 'number'}),
    defineField({name: 'activeListingCountYoY', title: 'Active Listing Count YoY (%)', type: 'number'}),
    defineField({name: 'pendingListingCount', title: 'Pending Listing Count', type: 'number'}),
    defineField({name: 'medianDaysOnMarket', title: 'Median Days on Market', type: 'number'}),
    defineField({name: 'inventoryMonths', title: 'Inventory (Months)', type: 'number'}),
    defineField({name: 'marketHotnessScore', title: 'Market Hotness Score', type: 'number'}),
    defineField({name: 'marketHotnessRank', title: 'Market Hotness Rank (County)', type: 'number'}),

    defineField({
      name: 'sourceLabel',
      title: 'Source Label',
      type: 'string',
      initialValue: 'Realtor.com® Economic Research',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      initialValue: 'https://www.realtor.com/research/data/',
    }),
    defineField({name: 'notes', title: 'Notes', type: 'text', rows: 2}),
  ],
  preview: {
    select: {title: 'zip', month: 'month'},
    prepare({title, month}) {
      return {
        title: title ? `ZIP ${title}` : 'Market Stat',
        subtitle: month ? `${month}` : '',
      }
    },
  },
})
