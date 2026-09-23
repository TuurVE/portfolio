import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Deployed to https://tve-photo.sanity.studio with `npm run deploy`.
  studioHost: 'tve-photo',
  deployment: {autoUpdates: true},
})
