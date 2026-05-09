'use client'

/**
 * Embedded Sanity Studio at /studio.
 * The Studio uses browser-only APIs, so this whole route is client-rendered.
 * Metadata/viewport exports live in layout.tsx (server) — they can't sit on a
 * 'use client' file.
 */

import { NextStudio } from 'next-sanity/studio'

import config from '../../../sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}
