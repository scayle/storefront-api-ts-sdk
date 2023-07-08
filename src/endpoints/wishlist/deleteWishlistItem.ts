import {basketWithQueryParameter} from '../../endpoints/basket/getBasket';
import {WishlistWith} from '../../endpoints/wishlist/getWishlist';
import {BapiCall} from '../../helpers/execute';
import {WishlistResponse} from '../../types/Wishlist';

export interface DeleteWishlistParameters {
  wishlistKey: string;
  itemKey: string;

  with?: WishlistWith;
  campaignKey?: string;

  pricePromotionKey?: string;
}

export function deleteWishlistEndpointRequest(params: DeleteWishlistParameters): BapiCall<WishlistResponse> {
  return {
    method: 'DELETE',
    endpoint: `/v1/wishlists/${params.wishlistKey}/items/${params.itemKey}`,
    params: {
      ...(params.with ? {with: basketWithQueryParameter(params.with).join(',')} : undefined),
      ...(params.campaignKey ? {campaignKey: params.campaignKey} : undefined),
      ...(params.pricePromotionKey ? {pricePromotionKey: params.pricePromotionKey} : undefined),
    },
  };
}
