import type { StorefrontAPICall } from '../../helpers/execute'
import type { ProductWith } from '../../types/ProductWith'
import { productWithQueryParameterValues } from '../../types/ProductWith'
import type { ProductSearchQuery } from '../../types/ProductSearchQuery'
import { queryParamsFromProductSearchQuery } from '../../types/ProductSearchQuery'
import type { Product } from '../../types/Product'

export interface SimilarProductsEndpointParameters {
  productId: number
  with?: ProductWith
  pricePromotionKey?: string
  campaignKey?: string
  where?: ProductSearchQuery
  limit?: number
  ignoreSameMasterKey?: boolean
}

export interface SimilarProductsEndpointResponseData {
  recommendations: { product: Product; imageConfidenceScore: number }[]
}

export function createSimilarProductsEndpointRequest(
  parameters: SimilarProductsEndpointParameters,
): StorefrontAPICall<SimilarProductsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/recommendations/similar/${parameters.productId}`,
    params: {
      ...(parameters.with
        ? { with: productWithQueryParameterValues(parameters.with).join(`,`) }
        : undefined),
      ...queryParamsFromProductSearchQuery(parameters.where),
      ...(parameters.campaignKey
        ? { campaignKey: parameters.campaignKey }
        : undefined),
      ...(parameters.pricePromotionKey
        ? {
          pricePromotionKey: parameters.pricePromotionKey,
        }
        : undefined),
      ...(parameters.limit !== undefined
        ? { limit: parameters.limit }
        : undefined),
      ...(parameters.ignoreSameMasterKey
        ? { ignoreSameMasterKey: parameters.ignoreSameMasterKey }
        : undefined),
    },
  }
}
