import { createImageUrlBuilder } from '@sanity/image-url'

import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

// @sanity/image-url doesn't export SanityImageSource publicly; callers pass our SanityImageRef.
export function urlFor(source: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- builder.image accepts any image-shaped input
  return builder.image(source as any)
}
