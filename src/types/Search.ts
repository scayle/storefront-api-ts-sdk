import type { Category } from './Category'
import type {
  NavigationItemCategory,
  NavigationItemExternal,
  NavigationItemPage,
} from './navigation'
import type { Product } from './Product'

export type SearchEntity =
  | CategorySearchSuggestion
  | ProductSearchSuggestion
  | NavigationItemSuggestion
  | { type: undefined }

export interface NavigationItemSuggestion {
  type: 'navigationItem'
  navigationItemSuggestion: {
    navigationItem:
      | NavigationItemExternal
      | NavigationItemCategory
      | NavigationItemPage
  }
}
export interface CategorySearchSuggestion {
  type: 'category'
  categorySuggestion: {
    category: Category
    filters: CategoryFilter[]
  }
}

export type CategoryFilter = CategoryAttributeFilter | CategoryBooleanFilter | {
  type: undefined
}

export interface CategoryAttributeFilter {
  type: 'attribute'
  attributeFilter: {
    group: {
      id: number
      key: string
      label: string
      type: string
      multiSelect: boolean
    }
    values: Array<{
      id: number
      value: string
      label: string
    }>
  }
}

export interface CategoryBooleanFilter {
  type: 'boolean'
  booleanFilter: {
    slug: string
    value: boolean
    label: string
  }
}

export interface ProductSearchSuggestion {
  type: 'product'
  productSuggestion: {
    product: Product
  }
}
