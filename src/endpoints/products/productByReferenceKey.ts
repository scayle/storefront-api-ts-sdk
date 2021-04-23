import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiProduct} from 'bapi/types/BapiProduct';
import {
  ProductWith,
  productWithQueryParameterValues,
} from 'bapi/types/ProductWith';
import {Pagination} from './productsByIds';

export interface ProductsByReferenceKeyRequestData {
  referenceKey: string;
  with?: ProductWith;
  campaignKey?: string;
  pricePromotionKey?: string;
  includeSellableForFree?: boolean;
}

export interface ProductByReferenceKeyResponseData {
  entities: BapiProduct[];
  pagination: Pagination;
}

export function createProductByReferenceKeyRequest(
  parameters: ProductsByReferenceKeyRequestData,
): BapiCall<ProductByReferenceKeyResponseData> {
  if (!parameters.referenceKey) {
    throw new Error(`"referenceKey" must not be an empty string.`);
  }

  return {
    method: 'GET',
    endpoint: `products`,
    params: {
      referenceKey: parameters.referenceKey,
      ...(parameters.with
        ? {with: productWithQueryParameterValues(parameters.with).join(`,`)}
        : undefined),
      ...(parameters.campaignKey
        ? {campaignKey: parameters.campaignKey}
        : undefined),
      ...(parameters.pricePromotionKey
        ? {
            pricePromotionKey: parameters.pricePromotionKey,
          }
        : undefined),
      ...(parameters.includeSellableForFree
        ? {includeSellableForFree: parameters.includeSellableForFree}
        : undefined),
    },
  };
}
