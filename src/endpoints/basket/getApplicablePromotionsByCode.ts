import type { BasketResponseData, BasketWith } from './getBasket'
import { basketWithQueryParameter } from './getBasket'
import type { StorefrontAPICall } from '../../helpers/execute'
import { buildCustomerTokenHeader, buildOrderCustomDataHeaders } from './utils'

export interface GetApplicablePromotionsByCodeParameters {
  basketKey: string
  promotionCode: string
  with?: BasketWith
  campaignKey?: string
  pricePromotionKey?: string
  includeItemsWithoutProductData?: boolean
  orderCustomData?: Record<string, unknown>
  /** Optional customer token to be used for the request and will be sent as `X-Customer-Token` header */
  customerToken?: string
}

/**
 * Send the promotion code and receive the applicable promotions for the given basket
 *
 * @param params The parameters for the request including the basket key and promotion code
 * @returns The BasketResponseData including applicable promotions
 *
 * @see https://scayle.dev/en/api-guides/storefront-api/resources/baskets/get-applicable-promotions-by-code
 */
export function getApplicablePromotionsByCodeRequest(
  params: GetApplicablePromotionsByCodeParameters,
): StorefrontAPICall<BasketResponseData> {
  return {
    method: 'POST',
    endpoint: `/v1/baskets/${params.basketKey}/promotion-code`,
    headers: {
      ...buildOrderCustomDataHeaders(params.orderCustomData),
      ...buildCustomerTokenHeader(params.customerToken),
    },
    params: {
      ...(params.with
        ? { with: basketWithQueryParameter(params.with).join(',') }
        : undefined),
      ...(params.campaignKey ? { campaignKey: params.campaignKey } : undefined),
      ...(params.pricePromotionKey
        ? { pricePromotionKey: params.pricePromotionKey }
        : undefined),
      ...(params.includeItemsWithoutProductData
        ? {
          includeItemsWithoutProductData: params.includeItemsWithoutProductData,
        }
        : undefined),
    },
    data: {
      promotionCode: params.promotionCode,
    },
  }
}
