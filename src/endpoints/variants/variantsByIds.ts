import type { StorefrontAPICall } from '../../helpers/execute'
import type { Variant } from '../../types/Product'
import type { VariantWith } from '../../types/ProductWith'
import { variantWithQueryParameterValues } from '../../types/ProductWith'
import type { Pagination } from '../products/productsByIds'

export interface VariantsByIdsEndpointParameters {
  variantIds: number[]
  with?: VariantWith
  campaignKey?: string
  pricePromotionKey?: string
}

export interface VariantsByIdsEndpointResponseData {
  entities: VariantDetail[]
  pagination: Pagination
}

// Variant as returned by the `/variants` endpoint
export type VariantDetail = Variant & { productId: number }

export function createVariantsByIdsEndpointRequest(
  parameters: VariantsByIdsEndpointParameters,
): StorefrontAPICall<VariantsByIdsEndpointResponseData> {
  if (parameters.variantIds.length === 0) {
    throw new Error(`"variantIds" parameter must not be an empty array.`)
  }

  return {
    method: 'GET',
    endpoint: `/v1/variants`,
    params: {
      ids: parameters.variantIds.join(`,`),
      ...(parameters.with
        ? { with: variantWithQueryParameterValues(parameters.with).join(`,`) }
        : undefined),
      ...(parameters.campaignKey
        ? { campaignKey: parameters.campaignKey }
        : undefined),
      ...(parameters.pricePromotionKey
        ? {
          pricePromotionKey: parameters.pricePromotionKey,
        }
        : undefined),
    },
  }
}
