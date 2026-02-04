import {StructureBuilder} from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Veronica Studio')
    .items([
      // SETTINGS
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.documentTypeListItem('pageSettings').title('Page Settings'),
            ])
        ),

      S.divider(),

      // CONTENT
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('page').title('Pages'),
              S.documentTypeListItem('snippet').title('Snippets'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
            ])
        ),

      S.divider(),

      // REAL ESTATE
      S.listItem()
        .title('Real Estate')
        .child(
          S.list()
            .title('Real Estate')
            .items([
              S.documentTypeListItem('listing').title('Listings'),
              S.documentTypeListItem('listingCollection').title('Listing Collections'),
              S.documentTypeListItem('market').title('Markets'),
              S.documentTypeListItem('neighborhood').title('Neighborhoods'),
              S.documentTypeListItem('subdivision').title('Subdivisions'),
              S.documentTypeListItem('marketStatMonthly').title('Market Stats (Monthly)'),
            ])
        ),

      S.divider(),

      // SOCIAL
      S.listItem()
        .title('Social')
        .child(
          S.list()
            .title('Social')
            .items([
              S.documentTypeListItem('socialPost').title('Posts'),
              // enable this if you add socialCollection schema:
              // S.documentTypeListItem('socialCollection').title('Collections'),
            ])
        ),

      S.divider(),

      // LEADS
      S.listItem()
        .title('Leads')
        .child(
          S.list()
            .title('Leads')
            .items([
              S.documentTypeListItem('lead').title('Leads'),
              S.documentTypeListItem('leadInquiry').title('Inquiries'),
              S.documentTypeListItem('formDefinition').title('Forms'),
            ])
        ),

      S.divider(),

      // ASSETS
      S.listItem()
        .title('Assets')
        .child(
          S.list()
            .title('Assets')
            .items([
              S.documentTypeListItem('imageAsset').title('Images'),
              S.documentTypeListItem('videoAsset').title('Videos'),
              S.documentTypeListItem('documentAsset').title('Documents'),
            ])
        ),
    ])
