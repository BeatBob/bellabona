import Image from 'next/image'

import { urlFor } from '../../sanity/lib/image'
import type { SanityImageRef } from '../../sanity/lib/types'

type Props = {
  image: SanityImageRef
  width: number
  height: number
  priority?: boolean
  sizes?: string
  className?: string
  alt?: string
}

export function SanityImage({
  image,
  width,
  height,
  priority,
  sizes,
  className,
  alt,
}: Props) {
  if (!image?.asset) return null

  const asset = image.asset
  const src =
    'url' in asset
      ? asset.url
      : urlFor(image).width(width * 2).height(height * 2).fit('crop').auto('format').url()

  const lqip = 'url' in asset ? asset.metadata?.lqip : undefined

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt ?? image.alt ?? ''}
      priority={priority}
      sizes={sizes}
      placeholder={lqip ? 'blur' : undefined}
      blurDataURL={lqip}
      className={className}
    />
  )
}
