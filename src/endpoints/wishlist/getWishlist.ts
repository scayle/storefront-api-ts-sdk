import type { BasketWith } from '../../endpoints/basket/getBasket'
import { basketWithQueryParameter } from '../../endpoints/basket/getBasket'
import type { StorefrontAPICall } from '../../helpers/execute'
import type { Product, Variant } from '../../types/Product'

export type WishlistWith = BasketWith

export interface WishlistResponseData {
  key: string
  items: WishlistItem[]
}

export interface WishlistItem {
  key: string
  product: Product
  productId: number
  variant?: Variant
  variantId: number | null
}

export interface GetWishlistParameters {
  wishlistKey: string

  with?: WishlistWith
  campaignKey?: string

  pricePromotionKey?: string
}

export function getWishlistEndpointRequest(
  params: GetWishlistParameters,
): StorefrontAPICall<WishlistResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/wishlists/${params.wishlistKey}`,
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
