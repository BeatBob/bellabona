import { defineArrayMember, defineField, defineType } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [{ title: 'Normal', value: 'normal' }],
              lists: [],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                ],
                annotations: [],
              },
            }),
          ],
        }),
        defineField({ name: 'cta', title: 'Primary CTA', type: 'cta' }),
        defineField({
          name: 'backgroundImage',
          title: 'Background image',
          type: 'imageWithAlt',
          description: 'LCP image — pick a high-quality, well-cropped asset.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'logoBar',
      title: 'Logo bar',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow text', type: 'string' }),
        defineField({
          name: 'logos',
          title: 'Logos',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Company name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'logo',
                  title: 'Logo',
                  type: 'imageWithAlt',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: { title: 'name', media: 'logo' },
              },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'features',
      title: 'Features',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'heading', title: 'Section heading', type: 'string' }),
        defineField({ name: 'subheading', title: 'Section subheading', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'imageWithAlt',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: { title: 'title', media: 'icon' },
              },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'finalCta',
      title: 'Final CTA',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
        defineField({ name: 'cta', title: 'CTA', type: 'cta' }),
        defineField({
          name: 'backgroundImage',
          title: 'Background image (optional)',
          type: 'imageWithAlt',
        }),
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'hero.headline' },
    prepare: ({ title }) => ({ title: 'Homepage', subtitle: title || 'No headline yet' }),
  },
})
