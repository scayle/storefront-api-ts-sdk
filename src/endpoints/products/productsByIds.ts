import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiProduct} from 'bapi/types/BapiProduct';
import {
  ProductWith,
  productWithQueryParameterValues,
} from 'bapi/types/ProductWith';

export interface ProductsByIdsEndpointParameters {
  productIds: number[];
  with?: ProductWith;
  campaignKey?: 'px' | undefined;
}
export interface Pagination {
  current: number;
  total: number;
  perPage: number;
  page: number;
  first: number;
  prev: number;
  next: number;
  last: number;
}

export interface ProductsByIdsEndpointResponseData {
  entities: BapiProduct[];
  pagination: Pagination;
}

export function createProductsByIdsEndpointRequest(
  parameters: ProductsByIdsEndpointParameters,
): BapiCall<ProductsByIdsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `products`,
    params: {
      ids: parameters.productIds.join(`,`),
      ...(parameters.with
        ? {with: productWithQueryParameterValues(parameters.with).join(`,`)}
        : undefined),
      campaignKey: parameters.campaignKey,
    },
  };
}
