import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Hit this after publishing in /studio to bust the ISR cache:
//   GET /api/revalidate?secret=<REVALIDATE_SECRET>&tag=siteSettings
//   GET /api/revalidate?secret=<REVALIDATE_SECRET>&tag=homepage
// Wire it to a Sanity webhook for hands-off revalidation.

const TAGS = ['homepage', 'siteSettings'] as const
type Tag = (typeof TAGS)[number]

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const tag = req.nextUrl.searchParams.get('tag')

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'invalid secret' }, { status: 401 })
  }

  if (!tag) {
    for (const t of TAGS) revalidateTag(t, 'default')
    return NextResponse.json({ revalidated: TAGS })
  }

  if (!(TAGS as readonly string[]).includes(tag)) {
    return NextResponse.json({ error: `unknown tag "${tag}"` }, { status: 400 })
  }

  revalidateTag(tag as Tag, 'default')
  return NextResponse.json({ revalidated: [tag] })
}
