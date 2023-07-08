import {BapiCall} from '../../helpers/execute';
import {Product} from '../../types/Product';
import {ProductWith, productWithQueryParameterValues} from '../../types/ProductWith';

export interface ProductByIdEndpointParameters {
  productId: number;
  with?: ProductWith;
  campaignKey?: string;
  pricePromotionKey?: string;
  includeSellableForFree?: boolean;
}

export type ProductByIdEndpointResponseData = Product;

/**
 * Required as single product call is the only one that can return `siblings`
 */
export function createProductByIdEndpointRequest(
  parameters: ProductByIdEndpointParameters,
): BapiCall<ProductByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/products/${parameters.productId}`,
    params: {
      ...(parameters.with ? {with: productWithQueryParameterValues(parameters.with).join(`,`)} : undefined),
      ...(parameters.campaignKey ? {campaignKey: parameters.campaignKey} : undefined),
      ...(parameters.pricePromotionKey
        ? {
            pricePromotionKey: parameters.pricePromotionKey,
          }
        : undefined),
      ...(parameters.includeSellableForFree ? {includeSellableForFree: parameters.includeSellableForFree} : undefined),
    },
  };
}
