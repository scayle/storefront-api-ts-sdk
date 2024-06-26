import type { StorefrontAPICall } from '../../helpers/execute'
import type { Wishlist, WishlistWith } from '../../types/Wishlist'
import { wishlistWithQueryParameter } from './utils'

export interface GetWishlistParameters {
  wishlistKey: string

  with?: WishlistWith

  campaignKey?: string
  pricePromotionKey?: string
}

export function getWishlistEndpointRequest(
  params: GetWishlistParameters,
): StorefrontAPICall<Wishlist> {
  return {
    method: 'GET',
    endpoint: `/v1/wishlists/${params.wishlistKey}`,
    params: {
      ...(params.with
        ? { with: wishlistWithQueryParameter(params.with).join(',') }
        : undefined),
      ...(params.campaignKey ? { campaignKey: params.campaignKey } : undefined),
      ...(params.pricePromotionKey
        ? { pricePromotionKey: params.pricePromotionKey }
        : undefined),
    },
  }
}
