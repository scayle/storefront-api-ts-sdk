import {
  BasketWith,
  basketWithQueryParameter,
} from '../../endpoints/basket/getBasket';
import {BapiCall} from '../../helpers/execute';
import {BapiProduct, Variant} from '../../types/BapiProduct';

export type WishlistWith = BasketWith;

export interface WishlistResponseData {
  key: string;
  items: WishlistItem[];
}

export interface WishlistItem {
  key: string;

  product?: BapiProduct;
  variant?: Variant;
}

export interface GetWishlistParameters {
  wishlistKey: string;

  with?: WishlistWith;
  campaignKey?: string;

  pricePromotionKey?: string;
}

export function getWishlistEndpointRequest(
  params: GetWishlistParameters,
): BapiCall<WishlistResponseData> {
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
