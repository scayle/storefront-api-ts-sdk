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
  campaignKey?: string;

  childShopId?: number;

  pricePromotionKey?: string;

  skipAvailabilityCheck?: boolean;
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
      ...(params.pricePromotionKey
        ? {pricePromotionKey: params.pricePromotionKey}
        : undefined),
      ...(params.skipAvailabilityCheck
        ? {skipAvailabilityCheck: params.skipAvailabilityCheck}
        : undefined),
    },
    data: {
      ...params.item,
      ...(params.childShopId ? {shopId: params.childShopId} : undefined),
    },
  };
}
