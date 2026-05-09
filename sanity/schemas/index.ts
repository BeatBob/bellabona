import type { SchemaTypeDefinition } from 'sanity'

import { cta } from './objects/cta'
import { imageWithAlt } from './objects/imageWithAlt'
import { seo } from './objects/seo'
import { homepage } from './homepage'
import { siteSettings } from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Reusable objects
  seo,
  cta,
  imageWithAlt,
  // Documents
  homepage,
  siteSettings,
]
