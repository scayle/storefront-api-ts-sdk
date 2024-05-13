import { basketWithQueryParameter } from '../../endpoints/basket/getBasket'
import type {
  WishlistResponseData,
  WishlistWith,
} from '../../endpoints/wishlist/getWishlist'
import type { StorefrontAPICall } from '../../helpers/execute'

export interface DeleteWishlistParameters {
  wishlistKey: string
  itemKey: string

  with?: WishlistWith
  campaignKey?: string

  pricePromotionKey?: string
}

export function deleteWishlistEndpointRequest(
  params: DeleteWishlistParameters,
): StorefrontAPICall<WishlistResponseData> {
  return {
    method: 'DELETE',
    endpoint: `/v1/wishlists/${params.wishlistKey}/items/${params.itemKey}`,
    params: {
      ...(params.with
        ? { with: basketWithQueryParameter(params.with).join(',') }
        : undefined),
      ...(params.campaignKey ? { campaignKey: params.campaignKey } : undefined),
      ...(params.pricePromotionKey
        ? { pricePromotionKey: params.pricePromotionKey }
        : undefined),
    },
  }
}
