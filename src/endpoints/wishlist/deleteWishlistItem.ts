import {basketWithQueryParameter} from 'bapi/endpoints/basket/getBasket';
import {
  WishlistResponseData,
  WishlistWith,
} from 'bapi/endpoints/wishlist/getWishlist';
import {BapiCall} from 'bapi/interfaces/BapiCall';

export interface DeleteWishlistParameters {
  wishlistKey: string;
  itemKey: string;

  with?: WishlistWith;
  campaignKey?: 'px' | undefined;
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
    },
  };
}
