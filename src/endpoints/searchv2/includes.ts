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
  }
}

export const searchV2WithParamsToQuery = (includes?: SearchV2With) => {
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
  }

  if (includes?.product) {
    params.push(
      prefixList('product.')(productWithQueryParameterValues(includes.product)),
    )
  }

  if (params.length === 0) {
    return {}
  }

  return {
    with: params.join(','),
    'category.depth': depth,
  }
}
