import type { WishlistWith } from '../..'
import type { StorefrontAPICall } from '../../helpers/execute'
import type { Wishlist } from '../../types/Wishlist'
import { wishlistWithQueryParameter } from './utils'

export interface DeleteWishlistParameters {
  wishlistKey: string
  itemKey: string

  with?: WishlistWith

  campaignKey?: string
  pricePromotionKey?: string
}

export function deleteWishlistEndpointRequest(
  params: DeleteWishlistParameters,
): StorefrontAPICall<Wishlist> {
  return {
    method: 'DELETE',
    endpoint: `/v1/wishlists/${params.wishlistKey}/items/${params.itemKey}`,
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
