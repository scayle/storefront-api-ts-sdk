import {
  BasketWith,
  basketWithQueryParameter,
} from '../../endpoints/basket/getBasket';
import {BapiCall} from '../../helpers/execute';
import {WishlistResponse} from '../../types/Wishlist';

export type WishlistWith = BasketWith;

export interface GetWishlistParameters {
  wishlistKey: string;

  with?: WishlistWith;
  campaignKey?: string;

  pricePromotionKey?: string;
}

export function getWishlistEndpointRequest(
  params: GetWishlistParameters,
): BapiCall<WishlistResponse> {
  return {
    method: 'GET',
    endpoint: `/v1/wishlists/${params.wishlistKey}`,
    params: {
      ...(params.with
        ? {with: basketWithQueryParameter(params.with).join(',')}
        : undefined),
      ...(params.campaignKey ? {campaignKey: params.campaignKey} : undefined),
      ...(params.pricePromotionKey
        ? {pricePromotionKey: params.pricePromotionKey}
        : undefined),
    },
  };
}
