import { PortableText as PortableTextPrimitive, type PortableTextComponents } from 'next-sanity'
import type { PortableTextBlock } from '@portabletext/types'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-balance">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
}

export function PortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null
  return <PortableTextPrimitive value={value} components={components} />
}
