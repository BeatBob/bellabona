// Chrome-only fallback. Homepage content has no fallback on purpose —
// the brief flags hardcoded copy/images, so missing sections just don't render.
import type { SiteSettings } from '../sanity/lib/types'

export const FALLBACK_SITE_SETTINGS: SiteSettings = {
  siteName: 'Bella&Bona',
  logo: null,
  navLinks: [
    { label: 'Menu', href: '/menu' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'For teams', href: '/teams' },
    { label: 'Contact', href: '/contact' },
  ],
  headerCta: { label: 'Book a tasting', href: '/contact' },
  footerColumns: [
    {
      heading: 'Discover',
      links: [
        { label: 'Menu', href: '/menu' },
        { label: 'How it works', href: '/how-it-works' },
        { label: 'For teams', href: '/teams' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
      ],
    },
    {
      heading: 'Follow us',
      links: [
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'TikTok', href: 'https://tiktok.com' },
      ],
    },
    {
      heading: 'Newsletter',
      links: [
        { label: 'Weekly menu drop', href: '/newsletter' },
        { label: 'Press kit', href: '/press-kit' },
      ],
    },
  ],
  footerNote: '© Bella&Bona GmbH. Munich-made lunch.',
  organization: {
    legalName: 'Bella&Bona GmbH',
    url: 'https://bellabona.com',
    sameAs: ['https://instagram.com/bellabona', 'https://linkedin.com/company/bellabona'],
  },
}
