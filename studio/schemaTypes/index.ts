import {photo} from './photo'
import {seo} from './seo'
import {stat} from './stat'
import {gallery} from './gallery'
import {siteSettings} from './siteSettings'
import {homePage} from './homePage'
import {aboutPage} from './aboutPage'
import {experiencePage} from './experiencePage'
import {contactPage} from './contactPage'

/** One document each, with a fixed ID (= type name). See structure.ts. */
export const singletonTypes = ['siteSettings', 'homePage', 'aboutPage', 'experiencePage', 'contactPage']

export const schemaTypes = [
  photo,
  seo,
  stat,
  gallery,
  siteSettings,
  homePage,
  aboutPage,
  experiencePage,
  contactPage,
]
