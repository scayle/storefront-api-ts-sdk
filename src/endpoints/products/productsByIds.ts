import type { StorefrontAPICall } from '../../helpers/execute'
import type { Product } from '../../types/Product'
import type { ProductWith } from '../../types/ProductWith'
import { productWithQueryParameterValues } from '../../types/ProductWith'

export interface ProductsByIdsEndpointParameters {
  productIds: number[]
  with?: ProductWith
  campaignKey?: string
  includeSellableForFree?: boolean
  pricePromotionKey?: string
}
export interface Pagination {
  current: number
  total: number
  perPage: number
  page: number
  first: number
  prev: number
  next: number
  last: number
}

export interface ProductsByIdsEndpointResponseData {
  entities: Product[]
  pagination: Pagination
}

export function createProductsByIdsEndpointRequest(
  parameters: ProductsByIdsEndpointParameters,
): StorefrontAPICall<ProductsByIdsEndpointResponseData> {
  if (parameters.productIds.length === 0) {
    throw new Error(`"productIds" parameter must not be an empty array.`)
  }

  return {
    method: 'GET',
    endpoint: `/v1/products`,
    params: {
      ids: parameters.productIds.join(`,`),
      ...(parameters.with
        ? { with: productWithQueryParameterValues(parameters.with).join(`,`) }
        : undefined),
      ...(parameters.campaignKey
        ? { campaignKey: parameters.campaignKey }
        : undefined),
      ...(parameters.pricePromotionKey
        ? {
          pricePromotionKey: parameters.pricePromotionKey,
        }
        : undefined),
      ...(parameters.includeSellableForFree
        ? { includeSellableForFree: parameters.includeSellableForFree }
        : undefined),
    },
  }
}
