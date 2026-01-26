import {type SchemaTypeDefinition} from 'sanity'

import {siteSettings} from './siteSettings'
import {page} from './page'
import {testimonial} from './testimonial'
import {socialPost} from './socialPost'

import {neighborhood} from './neighborhood'
import {subdivision} from './subdivision'

import {imageAsset} from './imageAsset'
import {documentAsset} from './documentAsset'
import {videoAsset} from './videoAsset'

import {listing} from './objects/listing'
import {listingCollection} from './listingCollection'

import {lead} from './lead'
import {leadInquiry} from './leadInquiry'
import {formDefinition} from './formDefinition'

import {seo} from './objects/seo'
import {richContent} from './objects/richContent'
import {address} from './objects/address'
import {price} from './objects/price'
import {listingMedia} from './objects/listingMedia'

import {snippet} from './snippet'

import {sectionCta} from './objects/sectionCta'
import {sectionListings} from './objects/sectionListings'
import {sectionSocialFeed} from './objects/sectionSocialFeed'
import {sectionLeadForm} from './objects/section.LeadForm'
import {cta} from './objects/cta'
import {sectionHero} from './objects/sectionHero'
import {sectionRichText} from './objects/sectionRichText'
import {sectionGallery} from './objects/sectionGallery'
import {sectionSnippet} from './objects/sectionSnippet'


export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,

  // objects (register them, no mystery)
  seo,
  richContent,
  address,
  price,
  listingMedia,

  // taxonomy
  neighborhood,
  subdivision,

  // assets
  imageAsset,
  documentAsset,
  videoAsset,

  // content
  page,
  snippet,
  testimonial,
  listing,
  listingCollection,
  socialPost,

  // sections
  cta,
  sectionCta,
  sectionListings,
  sectionSocialFeed,
  sectionLeadForm,
  sectionHero,
  sectionRichText,
  sectionGallery,
  sectionSnippet,

  // leads
  formDefinition,
  lead,
  leadInquiry,
]
