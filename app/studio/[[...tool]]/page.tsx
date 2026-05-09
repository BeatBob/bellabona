'use client'

// Studio needs browser APIs; metadata/viewport exports live in layout.tsx.
import { NextStudio } from 'next-sanity/studio'

import config from '../../../sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}
