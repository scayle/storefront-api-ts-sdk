import type { Category } from './Category'
import type { Product } from './Product'

export type SearchEntity =
  | CategorySearchSuggestion
  | ProductSearchSuggestion
  | { type: undefined }

export interface CategorySearchSuggestion {
  type: 'category'
  categorySuggestion: {
    category: Category
    filters: CategoryFilter[]
  }
}

type CategoryFilter = CategoryAttributeFilter | CategoryBooleanFilter | {
  type: undefined
}

interface CategoryAttributeFilter {
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

interface CategoryBooleanFilter {
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
