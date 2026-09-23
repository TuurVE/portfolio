import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO & sharing',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'Meta title',
      type: 'string',
      description: 'Shown in the browser tab and in Google. Leave empty to use the page title. Aim for under 60 characters.',
      validation: (rule) => rule.max(70).warning('Google usually cuts titles off after ~60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'The short text under the title in Google results. Aim for 120–160 characters.',
      validation: (rule) => rule.max(180).warning('Google usually cuts descriptions off after ~160 characters.'),
    }),
    defineField({
      name: 'image',
      title: 'Share image',
      type: 'photo',
      description: 'Shown when the page is shared on WhatsApp, Facebook, LinkedIn… Cropped to 1200×630 around the hotspot.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
