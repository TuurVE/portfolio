import {defineField, defineType} from 'sanity'
import {BarChartIcon} from '@sanity/icons/BarChart'

// A headline number (e.g. “30+ games”). Lives once and is reused on the home
// page and the Experience page, so it only ever needs updating in one place.
export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'document',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'kicker',
      title: 'Where / what',
      type: 'string',
      description: 'Small label above the number, e.g. “STVV” or “Zolder 2025”.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Number',
      type: 'string',
      description: 'The big number. Text, so “30+” or “24H” work too.',
      validation: (rule) => rule.required().max(6),
    }),
    defineField({
      name: 'label',
      title: 'Label (home page)',
      type: 'string',
      description: 'Shown under the number on the home page, e.g. “Games in 1.5 seasons”.',
    }),
    defineField({
      name: 'unit',
      title: 'Unit (experience page)',
      type: 'string',
      description: 'Shown next to the number on the Experience page, e.g. “games covered”.',
    }),
  ],
  preview: {
    select: {value: 'value', kicker: 'kicker', label: 'label'},
    prepare: ({value, kicker, label}) => ({title: `${value ?? ''} — ${kicker ?? ''}`, subtitle: label}),
  },
})
