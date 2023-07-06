import {basketWithQueryParameter} from '../../endpoints/basket/getBasket';
import {WishlistWith} from '../../endpoints/wishlist/getWishlist';
import {BapiCall} from '../../helpers/execute';
import {WishlistResponse} from '../../types/Wishlist';

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

  skipAvailabilityCheck?: boolean;
}

export function addWishlistItemEndpointRequest(
  params: AddWishlistItemParameters,
): BapiCall<WishlistResponse> {
  return {
    method: 'POST',
    endpoint: `/v1/wishlists/${params.wishlistKey}/items`,
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
    },
  };
}
