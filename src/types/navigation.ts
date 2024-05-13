import type { RFC33339Date } from '../types/Product'
import type { Category } from './Category'

export interface NavigationItem {
  id: number
  name: string
  assets: { [key: string]: string }
  languages: { [key: string]: string }
  visibleFrom: RFC33339Date | null
  visibleTo: RFC33339Date | null
  children: NavigationItems
}

export type NavigationItemExternal = NavigationItem & {
  type: 'external'
  options: {
    url: string
    isOpenInNewWindows: boolean
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

export type NavigationItemCategory = NavigationItem & {
  type: 'category'
  extraFilters: {
    [key: string]:
      | NavigationItemExtraFilter
      | NavigationItemAttributeExtraFilter[]
  }
  categoryId: number
  category?: Category | null
}

export type NavigationItemPage = NavigationItem & {
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
