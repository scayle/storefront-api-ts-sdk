import type { ProductWith } from '../../types/ProductWith'
import { productWithQueryParameterValues } from '../../types/ProductWith'
import type { Product } from '../../types/Product'
import type { Category } from '../../types/Category'
import type { StorefrontAPICall } from '../../helpers/execute'

export interface SearchSuggestionsEndpointParameters {
  term: string

  campaignKey?: string

  with?: {
    brands?: 'all'
    categories?: 'all'
    productNames?: 'all'
    products?: 'all' | ProductWith
  }
}

export interface SearchSuggestionsEndpointResponseData {
  brands: Array<{
    id: number
    label: string
    value: string
  }>

  categories: Array<Category>

  productNames: Array<{
    term: string
  }>

  products: Array<Product>
}

function suggetionsWithQueryParameter(
  suggestionsWith: Exclude<
    SearchSuggestionsEndpointParameters['with'],
    undefined
  >,
): string[] {
  const withParams = []

  if (
    suggestionsWith.products &&
    typeof suggestionsWith.products === 'object'
  ) {
    withParams.push(
      ...productWithQueryParameterValues(suggestionsWith.products).map(
        value => `products.${value}`,
      ),
    )
  }

  return withParams
}

export function createSearchSuggestionsEndpointRequest(
  parameters: SearchSuggestionsEndpointParameters,
): StorefrontAPICall<SearchSuggestionsEndpointResponseData> {
  const topLevelIncludes: string[] = []
  if (parameters.with) {
    if (parameters.with.brands) {
      topLevelIncludes.push('brands')
    }
    if (parameters.with.categories) {
      topLevelIncludes.push('categories')
    }
    if (parameters.with.productNames) {
      topLevelIncludes.push('productNames')
    }
    if (parameters.with.products) {
      topLevelIncludes.push('products')
    }
  }

  return {
    method: 'GET',
    endpoint: `/v1/search/suggestions`,
    params: {
      term: parameters.term,

      ...(parameters.campaignKey
        ? { campaignKey: parameters.campaignKey }
        : undefined),

      with: [
        topLevelIncludes,
        ...(parameters.with
          ? suggetionsWithQueryParameter(parameters.with)
          : []),
      ].join(`,`),
    },
  }
}
