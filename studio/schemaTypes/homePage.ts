import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'sections', title: 'Sections'},
    {name: 'instagram', title: 'Instagram'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'headline',
          title: 'Title',
          type: 'text',
          rows: 3,
          description: 'Press Enter for a new line.',
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'intro', title: 'Intro', type: 'text', rows: 2}),
        defineField({
          name: 'image',
          title: 'Background photo',
          type: 'photo',
          description: 'Wide landscape photo. The text sits bottom-left, so set the hotspot on the action.',
        }),
        defineField({name: 'primaryCtaLabel', title: 'Portfolio button', type: 'string'}),
        defineField({name: 'secondaryCtaLabel', title: 'Contact button', type: 'string'}),
      ],
    }),
    defineField({
      name: 'sportsTitle',
      title: 'Sports section title',
      type: 'string',
      group: 'sections',
      description: 'The sports cards come from the portfolio galleries.',
    }),
    defineField({name: 'recentTitle', title: 'Recent frames — title', type: 'string', group: 'sections'}),
    defineField({name: 'recentCtaLabel', title: 'Recent frames — button', type: 'string', group: 'sections'}),
    defineField({
      name: 'recentFrames',
      title: 'Recent frames — photos',
      type: 'array',
      group: 'sections',
      description:
        'Pick 8 photos. Tip: choose “Select → Browse” to reuse a photo already uploaded to a gallery — its alt text and caption are reused automatically. Leave empty to show the first photos of each gallery.',
      of: [defineArrayMember({type: 'photo'})],
      options: {layout: 'grid'},
      validation: (rule) => rule.max(12),
    }),
    defineField({name: 'statsTitle', title: 'Stats — title', type: 'string', group: 'sections'}),
    defineField({
      name: 'statsCtaLabel',
      title: 'Stats — button',
      type: 'string',
      group: 'sections',
      description: 'The stats themselves are chosen in Site settings → Stats.',
    }),
    defineField({name: 'instagramTitle', title: 'Title', type: 'string', group: 'instagram'}),
    defineField({name: 'instagramCtaLabel', title: 'Button', type: 'string', group: 'instagram'}),
    defineField({
      name: 'instagramPosts',
      title: 'Posts',
      type: 'array',
      group: 'instagram',
      description: 'Four posts to feature. Upload (or browse to) the photo and paste the post link.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'instagramPost',
          fields: [
            defineField({name: 'image', title: 'Photo', type: 'photo', validation: (rule) => rule.required()}),
            defineField({
              name: 'url',
              title: 'Post link',
              type: 'url',
              description: 'e.g. https://www.instagram.com/p/…',
            }),
          ],
          preview: {select: {media: 'image', title: 'url'}},
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({name: 'seo', title: 'SEO & sharing', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Home'})},
})
