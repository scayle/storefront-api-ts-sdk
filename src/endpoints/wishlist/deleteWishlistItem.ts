import {basketWithQueryParameter} from '../../endpoints/basket/getBasket';
import {
  WishlistResponseData,
  WishlistWith,
} from '../../endpoints/wishlist/getWishlist';
import {BapiCall} from '../../interfaces/BapiCall';

export interface DeleteWishlistParameters {
  wishlistKey: string;
  itemKey: string;

  with?: WishlistWith;
  campaignKey?: string;

  pricePromotionKey?: string;
}

export function deleteWishlistEndpointRequest(
  params: DeleteWishlistParameters,
): BapiCall<WishlistResponseData> {
  return {
    method: 'DELETE',
    endpoint: `wishlists/${params.wishlistKey}/items/${params.itemKey}`,
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
