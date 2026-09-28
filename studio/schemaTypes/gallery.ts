import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'

export const gallery = defineType({
  name: 'gallery',
  title: 'Portfolio gallery',
  type: 'document',
  icon: ImagesIcon,
  groups: [
    {name: 'photos', title: 'Photos', default: true},
    {name: 'details', title: 'Details'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Sport',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      group: 'details',
      description: 'The part after tve.photo/portfolio/. Avoid changing it once the site is live — old links would break.',
      options: {source: 'title', maxLength: 48},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Position',
      type: 'number',
      group: 'details',
      description: 'Order in menus and on the home page (1 = first). The first gallery is also where “Portfolio” links to.',
      initialValue: 10,
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'details',
      description: 'Short line under the sport on the home page, e.g. “Track, pitlane & paddock”.',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      group: 'details',
      description: 'Optional short paragraph at the top of the gallery page. Good for Google.',
    }),
    defineField({
      name: 'cover',
      title: 'Cover photo',
      type: 'photo',
      group: 'details',
      description: 'Shown on the home page (portrait crop — set the hotspot). Leave empty to use the first photo.',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      group: 'photos',
      description:
        'Drag several files here at once to upload them. Drag to reorder — the first photo is shown large at the top. Click a photo to add alt text and a caption.',
      of: [defineArrayMember({type: 'photo'})],
      options: {layout: 'grid'},
    }),
    defineField({name: 'seo', title: 'SEO & sharing', type: 'seo', group: 'seo'}),
    defineField({name: 'shownOnHomepage', title: 'Show on home page', type: 'boolean', group: 'details', initialValue: true}),
  ],
  orderings: [{title: 'Position', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', photos: 'photos', cover: 'cover', first: 'photos.0'},
    prepare: ({title, photos, cover, first}) => ({
      title,
      subtitle: `${photos?.length ?? 0} photos`,
      media: cover?.asset ? cover : first,
    }),
  },
})
