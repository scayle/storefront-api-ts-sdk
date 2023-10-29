import {BapiCall} from '../../helpers/execute';
import {
  ProductWith,
  VariantWith,
  productWithQueryParameterValues,
  variantWithQueryParameterValues,
} from '../../types/ProductWith';
import {Wishlist} from '../../types/Wishlist';

export type WishlistWith = {
  items?: {
    product?: ProductWith;
    variant?: VariantWith;
  };
};

export function wishlistWithQueryParameter(wishlistWith: WishlistWith): string {
  const withParams = [];

  if (wishlistWith.items && wishlistWith.items.product) {
    withParams.push(
      ...productWithQueryParameterValues(wishlistWith.items.product).map(value => `items.product.${value}`),
    );
  }

  if (wishlistWith.items && wishlistWith.items.variant) {
    withParams.push(
      ...variantWithQueryParameterValues(wishlistWith.items.variant).map(value => `items.variant.${value}`),
    );
  }

  return withParams.join(',');
}

export type WishlistResponse = Wishlist;

export interface GetWishlistParameters {
  wishlistKey: string;

  with?: WishlistWith;
  campaignKey?: string;

  pricePromotionKey?: string;
}

export function getWishlistEndpointRequest(params: GetWishlistParameters): BapiCall<WishlistResponse> {
  return {
    method: 'GET',
    endpoint: `/v1/wishlists/${params.wishlistKey}`,
    params: {
      ...(params.with ? {with: wishlistWithQueryParameter(params.with)} : undefined),
      ...(params.campaignKey ? {campaignKey: params.campaignKey} : undefined),
      ...(params.pricePromotionKey ? {pricePromotionKey: params.pricePromotionKey} : undefined),
    },
  };
}
