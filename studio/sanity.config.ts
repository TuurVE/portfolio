import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, singletonTypes} from './schemaTypes'
import {structure} from './structure'

const singletons = new Set(singletonTypes)

export default defineConfig({
  name: 'default',
  title: 'TVE.photo',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({structure}),
    // GROQ playground for the developer; hidden from editors in production.
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
    // Singletons don't show up under "Create new…".
    templates: (templates) => templates.filter(({schemaType}) => !singletons.has(schemaType)),
  },

  document: {
    // No duplicate/delete/unpublish for singletons.
    actions: (actions, {schemaType}) =>
      singletons.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
