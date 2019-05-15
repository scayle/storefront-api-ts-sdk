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
  campaignKey?: 'px' | undefined;

  childShopId?: number;

  pricePromotionKey?: string;
}

export function addWishlistItemEndpointRequest(
  params: AddWishlistItemParameters,
): BapiCall<WishlistResponseData> {
  return {
    method: 'POST',
    endpoint: `wishlists/${params.wishlistKey}/items`,
    params: {
      ...(params.with
        ? {
            with: basketWithQueryParameter(params.with).join(','),
          }
        : undefined),
      ...(params.campaignKey ? {campaignKey: params.campaignKey} : undefined),
    },
    data: {
      ...params.item,
      ...(params.pricePromotionKey
        ? {customData: {pricePromotionKey: params.pricePromotionKey}}
        : undefined),
      ...(params.childShopId ? {shopId: params.childShopId} : undefined),
    },
  };
}
