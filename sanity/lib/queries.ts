import { groq } from 'next-sanity'

const imageProjection = `{
  ..., asset->{ url, metadata { lqip, dimensions } }, "alt": coalesce(alt, "")
}`

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    hero{
      headline,
      subheadline,
      cta,
      backgroundImage${imageProjection}
    },
    logoBar{
      eyebrow,
      logos[]{
        name,
        logo${imageProjection}
      }
    },
    features{
      heading,
      subheading,
      items[]{
        title,
        description,
        icon${imageProjection}
      }
    },
    finalCta{
      heading,
      body,
      cta,
      backgroundImage${imageProjection}
    },
    seo{
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogImage${imageProjection}
    }
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteName,
    logo${imageProjection},
    navLinks[]{ label, href, children[]{ label, href } },
    headerCta,
    footerColumns[]{
      heading,
      links[]{ label, href }
    },
    footerNote,
    organization
  }
`
