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
      name: 'stats',
      title: 'Stats',
      type: 'object',
      group: 'content',
      description: 'Three-card row of headline numbers (employee satisfaction, etc.).',
      fields: [
        defineField({
          name: 'items',
          title: 'Cards',
          type: 'array',
          validation: (Rule) => Rule.max(4),
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  description: 'Display value, e.g. "9/10", "30-40%", "1.2 MM".',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: { select: { title: 'value', subtitle: 'label' } },
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
          name: 'cards',
          title: 'Cards (top row)',
          type: 'array',
          description: 'Three dark-green cards with a headline value, title, and short description.',
          validation: (Rule) => Rule.max(4),
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  description: 'Big headline value, e.g. "30-40%", "7,50 €", "92%".',
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
                  rows: 2,
                }),
              ],
              preview: { select: { title: 'value', subtitle: 'title' } },
            }),
          ],
        }),
        defineField({
          name: 'image',
          title: 'Bottom row — image',
          type: 'imageWithAlt',
          description: 'Lifestyle image rendered to the left of the benefits list.',
        }),
        defineField({
          name: 'benefits',
          title: 'Bottom row — benefits',
          type: 'array',
          description: 'Three bullet items rendered next to the image. Each bullet uses an uploaded icon.',
          validation: (Rule) => Rule.max(4),
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Bullet icon',
                  type: 'imageWithAlt',
                  description: 'Small icon shown as the bullet (e.g. checkmark).',
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
                  rows: 2,
                }),
              ],
              preview: { select: { title: 'title', subtitle: 'description', media: 'icon' } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'ctaBanner',
      title: 'CTA banner',
      type: 'object',
      group: 'content',
      description: 'Coral banner with heading, button, and decorative image (e.g. tax-deductible lunches sales pitch).',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({ name: 'cta', title: 'CTA', type: 'cta' }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'imageWithAlt',
          description: 'Composite image rendered on the right side of the banner.',
        }),
      ],
    }),

    defineField({
      name: 'meals',
      title: 'Meals showcase',
      type: 'object',
      group: 'content',
      description: 'Lime-banner grid of meal cards (max 6). Mobile is a horizontal scroll.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          validation: (Rule) => Rule.max(6),
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'tag',
                  title: 'Tag',
                  type: 'string',
                  description: 'e.g. "Seasonal Specials", "High-Protein Meals".',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'ratingPercent',
                  title: 'Rating %',
                  type: 'string',
                  description: 'e.g. "94%".',
                }),
                defineField({
                  name: 'reviewCount',
                  title: 'Review count',
                  type: 'string',
                  description: 'e.g. "171 reviews".',
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'imageWithAlt',
                }),
              ],
              preview: { select: { title: 'title', subtitle: 'tag', media: 'image' } },
            }),
          ],
        }),
        defineField({ name: 'cta', title: 'CTA', type: 'cta' }),
      ],
    }),

    defineField({
      name: 'steps',
      title: 'Steps (how it works)',
      type: 'object',
      group: 'content',
      description: '3-up cards showing the onboarding flow, with a CTA below.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'items',
          title: 'Steps',
          type: 'array',
          validation: (Rule) => Rule.max(4),
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Step label',
                  type: 'string',
                  description: 'e.g. "Step 01".',
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
                  rows: 2,
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'imageWithAlt',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: { select: { title: 'title', subtitle: 'label', media: 'image' } },
            }),
          ],
        }),
        defineField({ name: 'cta', title: 'CTA', type: 'cta' }),
      ],
    }),

    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      group: 'content',
      description: 'Lime banner with a quote in a dark-green card flanked by two lifestyle images.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'leftImage', title: 'Left image', type: 'imageWithAlt' }),
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'authorName', title: 'Author name', type: 'string' }),
        defineField({ name: 'authorTitle', title: 'Author title', type: 'string' }),
        defineField({ name: 'rightImage', title: 'Right image', type: 'imageWithAlt' }),
      ],
    }),

    defineField({
      name: 'ctaBannerSecondary',
      title: 'CTA banner (secondary, green)',
      type: 'object',
      group: 'content',
      description: 'Green-themed CTA banner rendered below the testimonial.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({ name: 'cta', title: 'CTA', type: 'cta' }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'imageWithAlt',
          description: 'Image rendered on the right side of the banner.',
        }),
      ],
    }),

    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'object',
      group: 'content',
      description: 'Accordion of frequently asked questions.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'answer',
                  title: 'Answer',
                  type: 'text',
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: { select: { title: 'question', subtitle: 'answer' } },
            }),
          ],
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
