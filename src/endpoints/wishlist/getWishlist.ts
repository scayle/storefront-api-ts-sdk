import {
  BasketWith,
  basketWithQueryParameter,
} from 'bapi/endpoints/basket/getBasket';
import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiProduct, Variant} from 'bapi/types/BapiProduct';

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
  campaignKey?: 'px' | undefined;
}

export function getWishlistEndpointRequest(
  params: GetWishlistParameters,
): BapiCall<WishlistResponseData> {
  return {
    method: 'GET',
    endpoint: `wishlists/${params.wishlistKey}`,
    params: {
      ...(params.with
        ? {with: basketWithQueryParameter(params.with).join(',')}
        : undefined),
      ...(params.campaignKey ? {campaignKey: params.campaignKey} : undefined),
    },
  };
}
