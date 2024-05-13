import type {
  BasketItemDisplayData,
  BasketResponseData,
  BasketWith,
  ItemGroup,
} from '../../endpoints/basket/getBasket'
import { basketWithQueryParameter } from '../../endpoints/basket/getBasket'
import type { StorefrontAPICall } from '../../helpers/execute'

export interface CreateBasketItemParameters {
  basketKey: string
  variantId: number
  quantity: number
  childShopId?: number
  with?: BasketWith
  customData?: { [key: string]: any; [key: number]: any }
  displayData?: BasketItemDisplayData
  pricePromotionKey?: string
  campaignKey?: string
  skipAvailabilityCheck?: boolean
  includeItemsWithoutProductData?: boolean
  itemGroup?: ItemGroup
  promotionId?: string
}

export function createBasketItemRequest(
  params: CreateBasketItemParameters,
): StorefrontAPICall<BasketResponseData> {
  const customData = params.pricePromotionKey
    ? { ...params.customData, pricePromotionKey: params.pricePromotionKey }
    : params.customData

  return {
    method: 'POST',
    endpoint: `/v1/baskets/${params.basketKey}/items`,
    successfulResponseCodes: [201, 206, 409, 412, 413],
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
      variantId: params.variantId,
      quantity: params.quantity,
      ...(customData !== undefined ? { customData } : undefined),
      ...(params.childShopId ? { shopId: params.childShopId } : undefined),
      ...(params.displayData ? { displayData: params.displayData } : undefined),
      ...(params.itemGroup ? { itemGroup: params.itemGroup } : undefined),
      ...(params.promotionId ? { promotionId: params.promotionId } : undefined),
    },
  }
}
