import { basketWithQueryParameter } from '../../endpoints/basket/getBasket'
import type {
  WishlistResponseData,
  WishlistWith,
} from '../../endpoints/wishlist/getWishlist'
import type { StorefrontAPICall } from '../../helpers/execute'

export type WishlistItemCreationID =
  | {
    masterKey: string
  }
  | {
    productId: number
  }
  | {
    variantId: number
  }

export interface AddWishlistItemParameters {
  wishlistKey: string

  item: WishlistItemCreationID

  with?: WishlistWith
  campaignKey?: string

  childShopId?: number

  pricePromotionKey?: string

  skipAvailabilityCheck?: boolean
}

export function addWishlistItemEndpointRequest(
  params: AddWishlistItemParameters,
): StorefrontAPICall<WishlistResponseData> {
  return {
    method: 'POST',
    endpoint: `/v1/wishlists/${params.wishlistKey}/items`,
    successfulResponseCodes: [201, 409, 412, 413],
    params: {
      ...(params.with
        ? {
          with: basketWithQueryParameter(params.with).join(','),
        }
        : undefined),
      ...(params.campaignKey ? { campaignKey: params.campaignKey } : undefined),
      ...(params.pricePromotionKey
        ? { pricePromotionKey: params.pricePromotionKey }
        : undefined),
      ...(params.skipAvailabilityCheck
        ? { skipAvailabilityCheck: params.skipAvailabilityCheck }
        : undefined),
    },
    data: {
      ...params.item,
      ...(params.childShopId ? { shopId: params.childShopId } : undefined),
    },
  }
}
