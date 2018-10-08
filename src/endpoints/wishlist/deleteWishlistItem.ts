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
}

export function deleteWishlistEndpointRequest(
  params: DeleteWishlistParameters
): BapiCall<WishlistResponseData> {
  return {
    method: 'DELETE',
    endpoint: `wishlists/${params.wishlistKey}/items/${params.itemKey}`,
    params: {
      with: params.with
        ? basketWithQueryParameter(params.with).join(',')
        : undefined,
    },
  };
}
