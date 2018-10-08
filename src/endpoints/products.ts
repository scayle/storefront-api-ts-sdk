import {Pagination} from 'bapi/endpoints/productsByIds';
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
  parameters: ProductsSearchEndpointParameters
): BapiCall<ProductsSearchEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: 'products',
    params: {
      with: parameters.with
        ? productWithQueryParameterValues(parameters.with).join(`,`)
        : undefined,

      ...queryParamsFromProductSearchQuery(parameters.where),

      sort: parameters.sort && parameters.sort.by,
      sortDir: parameters.sort && parameters.sort.direction,
      sortScore: parameters.sort && parameters.sort.score,
      sortChannel: parameters.sort && parameters.sort.channel,
      page: parameters.pagination && parameters.pagination.page,
      perPage: parameters.pagination && parameters.pagination.perPage,
      campaignKey: parameters.campaignKey,
    },
  };
}
