import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    defineField({name: 'intro', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'image', title: 'Photo', type: 'photo', group: 'content'}),
    defineField({name: 'submitLabel', title: 'Send button', type: 'string', group: 'content'}),
    defineField({
      name: 'successMessage',
      title: 'Message after sending',
      type: 'string',
      group: 'content',
    }),
    defineField({name: 'seo', title: 'SEO & sharing', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Contact'})},
})
