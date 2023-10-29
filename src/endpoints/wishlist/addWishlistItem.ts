import {WishlistResponse, WishlistWith, wishlistWithQueryParameter} from '../../endpoints/wishlist/getWishlist';
import {BapiCall} from '../../helpers/execute';

export type WishlistItemCreationID =
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
  campaignKey?: string;
  pricePromotionKey?: string;
}

export function addWishlistItemEndpointRequest(params: AddWishlistItemParameters): BapiCall<WishlistResponse> {
  return {
    method: 'POST',
    endpoint: `/v1/wishlists/${params.wishlistKey}/items`,
    params: {
      ...(params.with
        ? {
            with: wishlistWithQueryParameter(params.with),
          }
        : undefined),
      ...(params.campaignKey ? {campaignKey: params.campaignKey} : undefined),
      ...(params.pricePromotionKey ? {pricePromotionKey: params.pricePromotionKey} : undefined),
    },
    data: {
      ...params.item,
    },
  };
}
