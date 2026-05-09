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
      name: 'logo',
      title: 'Logo',
      type: 'imageWithAlt',
      group: 'identity',
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
      name: 'headerCta',
      title: 'Header CTA',
      type: 'cta',
      group: 'navigation',
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
      ],
    }),
  ],
  preview: {
    select: { title: 'siteName' },
    prepare: ({ title }) => ({ title: 'Site Settings', subtitle: title }),
  },
})
