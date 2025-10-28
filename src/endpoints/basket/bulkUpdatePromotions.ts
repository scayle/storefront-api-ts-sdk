import type { BasketResponseData, BasketWith } from './getBasket'
import { basketWithQueryParameter } from './getBasket'
import type { StorefrontAPICall } from '../../helpers/execute'
import { buildCustomerTokenHeader, buildOrderCustomDataHeaders } from './utils'

/**
 * Parameters for bulk updating promotions on basket items.
 *
 * The submitted list is treated as the full set of promotions for each item.
 * Any promotion currently applied but not included in the request will be removed.
 * To prevent unintended removal, ensure to always send the complete list of active promotions for each item.
 *
 * @see https://scayle.dev/en/api-guides/storefront-api/resources/baskets/bulk-update-promotions
 */
export interface BulkUpdatePromotionsParameters {
  /** The unique identifier of the basket to update promotions for */
  basketKey: string
  /** Array of basket items with their associated promotions */
  items: {
    /** The unique identifier of the basket item */
    itemId: string
    /** Array of promotions to apply to this item */
    promotions: {
      /** The unique identifier of the promotion */
      id: string

      /** Optional promotion code. If provided, overrides the promotion ID */
      code?: string | null
    }[]
  }[]
  /** Optional fields to include in the response */
  with?: BasketWith
  /** Optional campaign key to associate with the promotion updates */
  campaignKey?: string
  /** Optional price promotion key for price-based promotions */
  pricePromotionKey?: string
  /** Whether to include items without product data in the response */
  includeItemsWithoutProductData?: boolean
  /** Whether to skip availability checks during promotion updates */
  skipAvailabilityCheck?: boolean
  /** Custom data to be associated with the order */
  orderCustomData?: Record<string, unknown>
  /** Optional customer token to be used for the request and will be sent as `X-Customer-Token` header */
  customerToken?: string
}

/**
 * Updates in bulk the promotions applied to the items of a basket.
 * The submitted list is treated as the full set of promotions for each item.
 * Any promotion currently applied but not included in the request will be removed.
 * To prevent unintended removal, ensure to always send the complete list of active promotions for each item.
 *
 * @param params The parameters for the request including the basket key and promotion code
 * @returns The BasketResponseData including applicable promotions
 *
 * @see https://scayle.dev/en/api-guides/storefront-api/resources/baskets/bulk-update-promotions
 */
export function bulkUpdatePromotionsRequest(
  params: BulkUpdatePromotionsParameters,
): StorefrontAPICall<BasketResponseData> {
  return {
    method: 'PUT',
    endpoint: `/v1/baskets/${params.basketKey}/promotions`,
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
      ...(params.skipAvailabilityCheck
        ? { skipAvailabilityCheck: params.skipAvailabilityCheck }
        : undefined),
    },
    data: params.items,
  }
}
