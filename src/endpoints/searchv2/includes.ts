import { prefixList } from '../../helpers/attributes'
import type { ProductWith } from '../../types/ProductWith'
import { productWithQueryParameterValues } from '../../types/ProductWith'

export interface SearchV2With {
  product?: ProductWith
  // The `with` includes used for all returned categories
  categories?: {
    parents?: 'all'

    // How many levels of children to load
    //
    // 0 means no children, 1 means 1 level of children, etc.
    children?: number
    properties?: string[]
  }
  navigationItem?: {
    category?: 'all' | {
      properties?: string[]
    }
  }
}

export const searchV2WithParamsToQuery = (
  includes?: SearchV2With,
): { with?: string; 'category.depth'?: number } => {
  const params = []
  let depth = 0

  if (includes?.categories) {
    if (includes.categories.parents === 'all') {
      params.push('category.parents')
    }

    if (includes.categories.children) {
      depth = includes.categories.children + 1
      params.push('category.children')
    }
    if (includes.categories.properties) {
      params.push(
        includes.categories.properties.map((propertyName) =>
          `category.properties:name(${propertyName})`
        ),
      )
    }
  }

  if (includes?.product) {
    params.push(
      prefixList('product.')(productWithQueryParameterValues(includes.product)),
    )
  }

  if (includes?.navigationItem) {
    if (includes.navigationItem.category === 'all') {
      params.push('navigationItem.category')
    } else if (includes.navigationItem.category?.properties) {
      params.push(
        includes.navigationItem.category.properties.map((propertyName) =>
          `navigationItem.category.properties:name(${propertyName})`
        ),
      )
    }
  }

  if (params.length === 0) {
    return {}
  }

  return {
    with: params.join(','),
    'category.depth': depth,
  }
}
