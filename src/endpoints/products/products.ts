import {Pagination} from 'bapi/endpoints/products/productsByIds';
import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiProduct} from 'bapi/types/BapiProduct';
import {
  ProductSearchQuery,
  queryParamsFromProductSearchQuery,
} from 'bapi/types/ProductSearchQuery';
import {
  ProductWith,
  productWithQueryParameterValues,
} from 'bapi/types/ProductWith';

export enum APISortOption {
  Price = 'price',
  DateAdded = 'new',
  Reduction = 'reduction',
}

export enum APISortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

export interface ProductSortConfig {
  by?: APISortOption;
  direction?: APISortOrder;
  score?: 'category_scores' | 'brand_scores';
  channel?: 'etkp' | 'size';
  sortingKey?: string;
}

export interface ProductsSearchEndpointParameters {
  where?: ProductSearchQuery;

  sort?: ProductSortConfig;

  campaignKey?: 'px' | undefined;

  with?: ProductWith;

  pagination?: {
    page?: number;
    perPage?: number;
  };
}

export interface ProductsSearchEndpointResponseData {
  entities: BapiProduct[];
  pagination: Pagination;
}

export function createProductsSearchEndpointRequest(
  parameters: ProductsSearchEndpointParameters,
): BapiCall<ProductsSearchEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: 'products',
    params: {
      ...(parameters.with
        ? {with: productWithQueryParameterValues(parameters.with).join(`,`)}
        : undefined),

      ...queryParamsFromProductSearchQuery(parameters.where),

      ...(parameters.sort && parameters.sort.by
        ? {sort: parameters.sort.by}
        : undefined),
      ...(parameters.sort && parameters.sort.direction
        ? {sortDir: parameters.sort.direction}
        : undefined),
      ...(parameters.sort && parameters.sort.score
        ? {sortScore: parameters.sort.score}
        : undefined),
      ...(parameters.sort && parameters.sort.channel
        ? {sortChannel: parameters.sort.channel}
        : undefined),
      ...(parameters.sort && parameters.sort.sortingKey
        ? {sortChannel: parameters.sort.sortingKey}
        : undefined),

      ...(parameters.pagination && parameters.pagination.page
        ? {page: parameters.pagination.page}
        : undefined),
      ...(parameters.pagination && parameters.pagination.perPage
        ? {perPage: parameters.pagination.perPage}
        : undefined),

      ...(parameters.campaignKey
        ? {campaignKey: parameters.campaignKey}
        : undefined),
    },
  };
}
