/**
 * Studio segment layout — server-side, only here to host metadata/viewport
 * exports (the page itself is a Client Component and can't export them).
 */
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
