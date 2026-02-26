import type {
  BasketItemDisplayData,
  BasketResponseData,
  BasketWith,
  ItemGroup,
} from '../../endpoints/basket/getBasket'
import { basketWithQueryParameter } from '../../endpoints/basket/getBasket'
import type { StorefrontAPICall } from '../../helpers/execute'
import { buildCustomerTokenHeader, buildOrderCustomDataHeaders } from './utils'

export interface UpdateBasketItemQuantity {
  basketKey: string
  itemKey: string
  quantity: number
  with?: BasketWith
  campaignKey?: string
  skipAvailabilityCheck?: boolean
  // Beware that specifying any of `customData`, `displayData`, `pricePromotionKey` will update the _entire_ `customData` for the basket item
  customData?: { [key: string]: any; [key: number]: any }
  displayData?: BasketItemDisplayData
  pricePromotionKey?: string
  includeItemsWithoutProductData?: boolean
  itemGroup?: ItemGroup
  /**
   * @deprecated - will be removed in the next major version as this does not support multiple promotions. Please switch to {@link promotions}.
   */
  promotionId?: string | null
  /**
   * @deprecated - will be removed in the next major version as this does not support multiple promotions. Please switch to {@link promotions}.
   */
  promotionCode?: string | null
  promotions?: {
    id: string
    code?: string | null
  }[]
  orderCustomData?: Record<string, unknown>
  /** Optional customer token to be used for the request and will be sent as `X-Customer-Token` header */
  customerToken?: string
}

export function updateBasketItemQuantityRequest(
  params: UpdateBasketItemQuantity,
): StorefrontAPICall<BasketResponseData> {
  const customData = params.pricePromotionKey
    ? { ...params.customData, pricePromotionKey: params.pricePromotionKey }
    : params.customData

  return {
    method: 'PATCH',
    endpoint: `/v1/baskets/${params.basketKey}/items/${params.itemKey}`,
    successfulResponseCodes: [200, 206, 404, 412, 413],
    headers: {
      ...buildOrderCustomDataHeaders(params.orderCustomData),
      ...buildCustomerTokenHeader(params.customerToken),
    },
    params: {
      ...(params.with
        ? { with: basketWithQueryParameter(params.with).join(',') }
        : undefined),
      ...(params.campaignKey ? { campaignKey: params.campaignKey } : undefined),
      ...(params.skipAvailabilityCheck
        ? { skipAvailabilityCheck: params.skipAvailabilityCheck }
        : undefined),
      ...(params.includeItemsWithoutProductData
        ? {
          includeItemsWithoutProductData: params.includeItemsWithoutProductData,
        }
        : undefined),
    },
    data: {
      quantity: params.quantity,
      ...(customData !== undefined ? { customData } : undefined),
      ...(params.displayData ? { displayData: params.displayData } : undefined),
      ...(params.itemGroup ? { itemGroup: params.itemGroup } : undefined),
      ...(params.promotionId !== undefined
        ? { promotionId: params.promotionId }
        : undefined),
      ...(params.promotionCode !== undefined
        ? { promotionCode: params.promotionCode }
        : undefined),
      ...(params.promotions !== undefined
        ? { promotions: params.promotions }
        : undefined),
    },
  }
}
