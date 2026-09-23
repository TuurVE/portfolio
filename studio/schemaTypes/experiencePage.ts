import {defineArrayMember, defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons/Book'

const statRef = defineField({
  name: 'stat',
  title: 'Number',
  type: 'reference',
  to: [{type: 'stat'}],
  description: 'Pick one of your Stats (or create a new one) — the same number is used on the home page.',
})

export const experiencePage = defineType({
  name: 'experiencePage',
  title: 'Experience',
  type: 'document',
  icon: BookIcon,
  groups: [
    {name: 'featured', title: 'Featured', default: true},
    {name: 'more', title: 'Other work'},
    {name: 'photos', title: 'Photos & call to action'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', type: 'string', group: 'featured', validation: (rule) => rule.required()}),
    defineField({name: 'intro', type: 'text', rows: 2, group: 'featured'}),
    defineField({
      name: 'featured',
      title: 'Featured club',
      type: 'object',
      group: 'featured',
      fields: [
        defineField({name: 'title', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'category', title: 'Category', type: 'string', description: 'e.g. “Pro League · Football”'}),
        statRef,
        defineField({name: 'meta', title: 'Extra info', type: 'string', description: 'e.g. “Home & away · Play-off 1”'}),
        defineField({name: 'image', title: 'Photo', type: 'photo'}),
        defineField({
          name: 'matches',
          title: 'Matches',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          description: 'One line per match, e.g. “STVV – KRC Genk”. Numbered automatically.',
        }),
      ],
    }),
    defineField({name: 'moreTitle', title: 'Section title', type: 'string', group: 'more'}),
    defineField({
      name: 'entries',
      title: 'Cards',
      type: 'array',
      group: 'more',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'experienceEntry',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'category', type: 'string', description: 'e.g. “Motorsport · Endurance”'}),
            statRef,
            defineField({
              name: 'details',
              title: 'Details',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              description: 'One line each, e.g. event names.',
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'category'}},
        }),
      ],
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      group: 'photos',
      of: [defineArrayMember({type: 'photo'})],
      options: {layout: 'grid'},
      description: 'Three photos work best.',
    }),
    defineField({name: 'ctaText', title: 'Call to action — text', type: 'string', group: 'photos'}),
    defineField({name: 'ctaLabel', title: 'Call to action — button', type: 'string', group: 'photos'}),
    defineField({name: 'seo', title: 'SEO & sharing', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Experience'})},
})
