import type { RFC33339Date } from '../types/Product'
import type { Category } from './Category'
import type { CategoryFilter } from './Search'

export interface NavigationItem<Items = NavigationItems | NavigationV2Items> {
  id: number
  name: string
  assets: { [key: string]: string }
  visibleFrom: RFC33339Date | null
  visibleTo: RFC33339Date | null
  children: Items
  customData?: Record<string, unknown>
}

/**
 * @deprecated The panel uses `individual-link` as type for external links. Therefore {@link IndividualLink} should be used from now on.
 */
type External = 'external'
type IndividualLink = 'individual-link'

export type NavigationItemExternal = NavigationItem<NavigationItems> & {
  type: External | IndividualLink
  options: {
    url: string
    isOpenInNewWindow: boolean
  }
}

export interface NavigationItemExtraFilter {
  include?: number[]
}

export type NavigationItemAttributeExtraFilter = NavigationItemExtraFilter & {
  attribute: {
    id: number
    key: string
    label: string
    type: string
    multiSelect: boolean
  }
}

export type NavigationItemCategory = NavigationItem<NavigationItems> & {
  type: 'category'
  /**
   * @deprecated the extra filters are replaced by the new `filters` property which is aligned with the Search V2 filter representation.
   */
  extraFilters: {
    [key: string]:
      | NavigationItemExtraFilter
      | NavigationItemAttributeExtraFilter[]
  }
  categoryId: number
  category?: Category | null
  filters: CategoryFilter[]
}

export type NavigationItemPage = NavigationItem<NavigationItems> & {
  type: 'page'
  page: string
}

export type NavigationItems = (
  | NavigationItemExternal
  | NavigationItemCategory
  | NavigationItemPage
)[]

export interface NavigationTree {
  id: number
  key: string
  name: string
  items: NavigationItems
}

export type NavigationV2ItemExternal = NavigationItem<NavigationV2Items> & {
  target: 'individual-link'
  linkTarget: {
    url: string
    openInNewWindow: boolean
  }
}

export type NavigationV2ItemCategory = NavigationItem<NavigationV2Items> & {
  target: 'category'
  categoryTarget?: {
    categoryId: number
    filters: CategoryFilter[]
    category?: Category | null
  }
}

export type NavigationV2ItemPage = NavigationItem<NavigationV2Items> & {
  target: 'page'
  pageTarget: {
    page: string
  }
}

export type NavigationV2Items = (
  | NavigationV2ItemExternal
  | NavigationV2ItemCategory
  | NavigationV2ItemPage
)[]

export interface NavigationV2Tree {
  id: number
  referenceKey: string
  name: string
  items: NavigationV2Items
}
