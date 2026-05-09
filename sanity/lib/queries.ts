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
    stats{
      items[]{ value, label }
    },
    features{
      heading,
      subheading,
      cards[]{ value, title, description },
      image${imageProjection},
      benefits[]{
        title,
        description,
        icon${imageProjection}
      }
    },
    ctaBanner{
      heading,
      description,
      cta,
      image${imageProjection}
    },
    meals{
      heading,
      cta,
      items[]{
        tag,
        title,
        ratingPercent,
        reviewCount,
        image${imageProjection}
      }
    },
    steps{
      heading,
      cta,
      items[]{
        label,
        title,
        description,
        image${imageProjection}
      }
    },
    testimonial{
      heading,
      leftImage${imageProjection},
      quote,
      authorName,
      authorTitle,
      rightImage${imageProjection}
    },
    ctaBannerSecondary{
      heading,
      description,
      cta,
      image${imageProjection}
    },
    faqs{
      heading,
      items[]{ question, answer }
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
    logoHeader${imageProjection},
    logoFooter${imageProjection},
    navLinks[]{ label, href, children[]{ label, href } },
    headerCta,
    headerSecondaryCta,
    footerSocial{
      heading,
      body,
      email,
      links[]{ platform, href, label }
    },
    footerColumns[]{
      heading,
      links[]{ label, href }
    },
    footerNote,
    organization
  }
`
