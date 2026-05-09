import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Shown in browser tabs and search results. Aim for ~50–60 characters.',
      validation: (Rule) => Rule.max(70).warning('Longer than 70 chars may be truncated in SERPs.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Shown in search results. Aim for ~150–160 characters.',
      validation: (Rule) =>
        Rule.max(180).warning('Longer than 180 chars may be truncated in SERPs.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path segment. The homepage uses "/" and ignores this.',
      options: { source: 'metaTitle', maxLength: 96 },
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      description: 'Used for OpenGraph / Twitter cards. 1200×630 recommended.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Optional. Override only if this content also lives at another URL.',
    }),
  ],
})
