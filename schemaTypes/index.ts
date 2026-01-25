import {type SchemaTypeDefinition} from 'sanity'
import {siteSettings} from './siteSettings'
import {page} from './page'
import {subdivision} from './subdivision'
import {testimonial} from './testimonial'

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  page,
  subdivision,
  testimonial,
]
