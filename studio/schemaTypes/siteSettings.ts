import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

const PAGES = [
  {title: 'Home', value: 'home'},
  {title: 'About', value: 'about'},
  {title: 'Experience', value: 'experience'},
  {title: 'Portfolio', value: 'portfolio'},
  {title: 'Contact', value: 'contact'},
]

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'navigation', title: 'Menu'},
    {name: 'stats', title: 'Stats'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'siteTitle', title: 'Site name', type: 'string', group: 'general', initialValue: 'TVE.photo'}),
    defineField({name: 'photographerName', title: 'Your name', type: 'string', group: 'general'}),
    defineField({
      name: 'jobTitle',
      title: 'Job title',
      type: 'string',
      group: 'general',
      initialValue: 'Sports photographer',
      description: 'Used by Google to describe you.',
    }),
    defineField({
      name: 'description',
      title: 'Footer text',
      type: 'text',
      rows: 2,
      group: 'general',
      description: 'The short line in the footer.',
    }),
    defineField({name: 'location', title: 'Based in', type: 'string', group: 'general', initialValue: 'Belgium'}),
    defineField({
      name: 'email',
      title: 'Public email address',
      type: 'string',
      group: 'general',
      description: 'Optional. Shown on the contact page and footer. Contact form messages go to the address set up in Web3Forms.',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram handle',
      type: 'string',
      group: 'general',
      description: 'Without the @, e.g. tve.photo',
    }),
    defineField({
      name: 'licenseUrl',
      title: 'Licence page (optional)',
      type: 'url',
      group: 'general',
      description: 'A page explaining how people may use your photos. Defaults to the contact page.',
    }),
    defineField({
      name: 'navigation',
      title: 'Main menu',
      type: 'array',
      group: 'navigation',
      description: 'Rename or reorder the menu items. “Portfolio” automatically gets a sub-menu with the galleries.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'page',
              type: 'string',
              options: {list: PAGES, layout: 'dropdown'},
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'page'}},
        }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Home page stats',
      type: 'array',
      group: 'stats',
      description: 'The numbers in “Where I’ve stood” on the home page. Edit the numbers themselves under “Stats”.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'stat'}]})],
      validation: (rule) => rule.max(4).unique(),
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO & sharing',
      type: 'seo',
      group: 'seo',
      description: 'Used for the home page and for any page without its own SEO settings.',
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
