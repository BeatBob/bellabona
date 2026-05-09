import 'server-only'

import { sanityClient } from './client'

const REVALIDATE_SECONDS = 3600

// Tags let a webhook trigger revalidateTag without per-route fiddling.
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: Record<string, unknown>
  tags: string[]
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { revalidate: REVALIDATE_SECONDS, tags },
  })
}
