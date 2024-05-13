import type { StorefrontAPICall } from '../../helpers/execute'
import type { Product } from '../../types/Product'
import type { ProductWith } from '../../types/ProductWith'
import { productWithQueryParameterValues } from '../../types/ProductWith'
import type { Pagination } from './productsByIds'

export interface ProductsByReferenceKeyRequestData {
  referenceKey: string
  with?: ProductWith
  campaignKey?: string
  pricePromotionKey?: string
  includeSellableForFree?: boolean
}

export interface ProductByReferenceKeyResponseData {
  entities: Product[]
  pagination: Pagination
}

export function createProductByReferenceKeyRequest(
  parameters: ProductsByReferenceKeyRequestData,
): StorefrontAPICall<ProductByReferenceKeyResponseData> {
  if (!parameters.referenceKey) {
    throw new Error(`"referenceKey" must not be an empty string.`)
  }

  return {
    method: 'GET',
    endpoint: `/v1/products`,
    params: {
      referenceKey: parameters.referenceKey,
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
