import type {StructureResolver} from 'sanity/structure'
import {BarChartIcon} from '@sanity/icons/BarChart'
import {CogIcon} from '@sanity/icons/Cog'
import {ImagesIcon} from '@sanity/icons/Images'

// Sidebar: pages first (each opens its single document directly), then the
// galleries, then settings. Singletons can't be duplicated or deleted.
const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem().title(title).id(type).schemaType(type).child(S.document().schemaType(type).documentId(type).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'homePage', 'Home'),
      singleton(S, 'aboutPage', 'About'),
      singleton(S, 'experiencePage', 'Experience'),
      singleton(S, 'contactPage', 'Contact'),
      S.divider(),
      S.documentTypeListItem('gallery')
        .title('Portfolio galleries')
        .icon(ImagesIcon)
        .child(S.documentTypeList('gallery').title('Portfolio galleries').defaultOrdering([{field: 'order', direction: 'asc'}])),
      S.divider(),
      singleton(S, 'siteSettings', 'Site settings').icon(CogIcon),
      S.documentTypeListItem('stat').title('Stats').icon(BarChartIcon),
    ])
