import type {
  BasketItemDisplayData,
  BasketResponseData,
  BasketWith,
  ItemGroup,
} from '../../endpoints/basket/getBasket'
import { basketWithQueryParameter } from '../../endpoints/basket/getBasket'
import type { StorefrontAPICall } from '../../helpers/execute'
import { buildOrderCustomDataHeaders } from './utils'

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
  promotionId?: string | null
  promotionCode?: string | null
  orderCustomData?: Record<string, unknown>
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
    headers: {
      ...buildOrderCustomDataHeaders(params.orderCustomData),
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
    },
  }
}
