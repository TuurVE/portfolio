import {defineField, defineType} from 'sanity'

// An image with hotspot/crop plus the two texts every photo should carry.
// Used everywhere a photo appears, so alt text is always one click away.
export const photo = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description:
        'Describe what is in the photo for people who can’t see it (and for Google). E.g. “STVV striker celebrates a goal in front of the home fans”.',
      validation: (rule) => rule.warning().max(160),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional. Who, what, when — shown under the photo and in the full-screen viewer.',
    }),
  ],
  preview: {
    select: {media: 'asset', title: 'caption', subtitle: 'alt'},
    prepare: ({media, title, subtitle}) => ({media, title: title || subtitle || 'Photo', subtitle: title ? subtitle : undefined}),
  },
})
