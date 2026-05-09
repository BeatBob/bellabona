import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'organization', title: 'Organization (JSON-LD)' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoHeader',
      title: 'Logo — Header',
      type: 'imageWithAlt',
      group: 'identity',
      description: 'Shown in the top navigation. Falls back to the site name wordmark if empty.',
    }),
    defineField({
      name: 'logoFooter',
      title: 'Logo — Footer',
      type: 'imageWithAlt',
      group: 'identity',
      description: 'Shown as the giant decorative mark at the bottom of the footer. Falls back to the site name wordmark if empty.',
    }),

    defineField({
      name: 'navLinks',
      title: 'Header navigation',
      type: 'array',
      group: 'navigation',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              description:
                'The link this label points to. If "Children" is set, this acts as the dropdown trigger and may be left empty.',
            }),
            defineField({
              name: 'children',
              title: 'Dropdown items (optional)',
              type: 'array',
              description:
                'If set, this nav item becomes a dropdown trigger and these are the items inside it.',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href', children: 'children' },
            prepare: ({ title, subtitle, children }) => ({
              title,
              subtitle:
                children && children.length
                  ? `${children.length} dropdown item${children.length === 1 ? '' : 's'}`
                  : subtitle,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'headerSecondaryCta',
      title: 'Header secondary link',
      type: 'cta',
      group: 'navigation',
      description: 'Optional underlined text link shown to the left of the primary CTA (e.g. "Download menu").',
    }),
    defineField({
      name: 'headerCta',
      title: 'Header CTA',
      type: 'cta',
      group: 'navigation',
    }),

    defineField({
      name: 'footerSocial',
      title: 'Footer — social block',
      type: 'object',
      group: 'footer',
      description: 'First footer column: heading, intro text, contact email, and social/app icons.',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'body', title: 'Intro text', type: 'text', rows: 2 }),
        defineField({ name: 'email', title: 'Contact email', type: 'string' }),
        defineField({
          name: 'links',
          title: 'Icon links',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Google', value: 'google' },
                      { title: 'Twitter / X', value: 'twitter' },
                      { title: 'Instagram', value: 'instagram' },
                      { title: 'LinkedIn', value: 'linkedin' },
                      { title: 'Facebook', value: 'facebook' },
                      { title: 'YouTube', value: 'youtube' },
                      { title: 'TikTok', value: 'tiktok' },
                      { title: 'Apple App Store', value: 'apple' },
                      { title: 'Google Play', value: 'googleplay' },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'href',
                  title: 'Link',
                  type: 'url',
                  validation: (Rule) =>
                    Rule.required().uri({ scheme: ['http', 'https', 'mailto'] }),
                }),
                defineField({
                  name: 'label',
                  title: 'Visible label (optional)',
                  type: 'string',
                  description: 'If set, renders next to the icon (e.g. "LinkedIn").',
                }),
              ],
              preview: { select: { title: 'platform', subtitle: 'href' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer columns',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Column heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                }),
              ],
            }),
          ],
          preview: { select: { title: 'heading' } },
        }),
      ],
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer note / copyright',
      type: 'string',
      group: 'footer',
    }),

    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'object',
      group: 'organization',
      description: 'Powers the Organization JSON-LD schema injected on every page.',
      fields: [
        defineField({
          name: 'legalName',
          title: 'Legal name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Canonical site URL',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'logoUrl',
          title: 'Logo URL (absolute)',
          type: 'url',
          description: 'Absolute URL to the logo used in JSON-LD.',
        }),
        defineField({
          name: 'sameAs',
          title: 'Social profiles',
          type: 'array',
          description: 'Powers the JSON-LD "sameAs" array.',
          of: [defineArrayMember({ type: 'url' })],
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'object',
          description: 'Emitted as PostalAddress in JSON-LD. Strong local-SEO signal.',
          fields: [
            defineField({ name: 'streetAddress', title: 'Street address', type: 'string' }),
            defineField({ name: 'postalCode', title: 'Postal code', type: 'string' }),
            defineField({ name: 'addressLocality', title: 'City', type: 'string' }),
            defineField({
              name: 'addressRegion',
              title: 'Region / state',
              type: 'string',
              description: 'ISO 3166-2 region code (e.g. "BY" for Bavaria).',
            }),
            defineField({
              name: 'addressCountry',
              title: 'Country',
              type: 'string',
              description: 'ISO 3166-1 alpha-2 (e.g. "DE").',
            }),
          ],
        }),
        defineField({
          name: 'contactPoint',
          title: 'Contact point',
          type: 'object',
          description: 'Emitted as ContactPoint in JSON-LD. Useful for B2B SERP surfaces.',
          fields: [
            defineField({ name: 'email', title: 'Email', type: 'string' }),
            defineField({ name: 'telephone', title: 'Telephone', type: 'string' }),
            defineField({
              name: 'contactType',
              title: 'Contact type',
              type: 'string',
              description: 'e.g. "sales", "customer support".',
            }),
            defineField({
              name: 'areaServed',
              title: 'Area served',
              type: 'array',
              description: 'ISO country codes, e.g. ["DE"].',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({
              name: 'availableLanguage',
              title: 'Available languages',
              type: 'array',
              description: 'BCP 47 codes, e.g. ["en", "de"].',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'siteName' },
    prepare: ({ title }) => ({ title: 'Site Settings', subtitle: title }),
  },
})
