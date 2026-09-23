import {defineArrayMember, defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons/User'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About',
  type: 'document',
  icon: UserIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'photo',
      group: 'content',
      description: 'Portrait (4:5) crop — set the hotspot on your face.',
    }),
    defineField({name: 'lead', title: 'Opening line', type: 'text', rows: 2, group: 'content'}),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'facts',
      title: 'Quick facts',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'fact',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'value', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
    }),
    defineField({name: 'primaryCtaLabel', title: 'Portfolio button', type: 'string', group: 'content'}),
    defineField({name: 'secondaryCtaLabel', title: 'Contact button', type: 'string', group: 'content'}),
    defineField({name: 'goalEyebrow', title: 'Goal — small label', type: 'string', group: 'content'}),
    defineField({name: 'goalText', title: 'Goal — quote', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'seo', title: 'SEO & sharing', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'About'})},
})
