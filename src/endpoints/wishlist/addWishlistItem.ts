import {basketWithQueryParameter} from 'bapi/endpoints/basket/getBasket';
import {
  WishlistResponseData,
  WishlistWith,
} from 'bapi/endpoints/wishlist/getWishlist';
import {BapiCall} from 'bapi/interfaces/BapiCall';

export type WishlistItemCreationID =
  | {
      masterKey: string;
    }
  | {
      productId: number;
    }
  | {
      variantId: number;
    };

export interface AddWishlistItemParameters {
  wishlistKey: string;

  item: WishlistItemCreationID;

  with?: WishlistWith;
}

export function addWishlistItemEndpointRequest(
  params: AddWishlistItemParameters,
): BapiCall<WishlistResponseData> {
  return {
    method: 'POST',
    endpoint: `wishlists/${params.wishlistKey}/items`,
    params: {
      with: params.with
        ? basketWithQueryParameter(params.with).join(',')
        : undefined,
    },
    data: params.item,
  };
}
