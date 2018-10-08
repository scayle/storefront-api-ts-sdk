import {Pagination} from 'bapi/endpoints/productsByIds';
import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiProduct, Attributes} from 'bapi/types/BapiProduct';
import {
  ProductSearchQuery,
  queryParamsFromProductSearchQuery,
} from 'bapi/types/ProductSearchQuery';
import {
  ProductWith,
  productWithQueryParameterValues,
} from 'bapi/types/ProductWith';
import {prefixList} from 'helpers/attributes';

export interface MastersSearchEndpointParameters {
  where?: ProductSearchQuery;

  // sort?: ProductSortConfig;

  campaignKey?: 'px' | undefined;

  with?: {
    products: ProductWith;
  };

  pagination?: {
    page?: number;
    perPage?: number;
  };
}

export interface BapiMaster {
  id: string;
  attributes: Attributes;
  matchedProductIds: number[];
  products: BapiProduct[];
}

export interface MastersSearchEndpointResponseData {
  entities: BapiMaster[];
  pagination: Pagination;
}

export function createMastersSearchEndpointRequest(
  parameters: MastersSearchEndpointParameters,
): BapiCall<MastersSearchEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: 'masters',
    params: {
      with:
        parameters.with && parameters.with.products
          ? prefixList(`products.`)(
              productWithQueryParameterValues(parameters.with.products),
            ).join(`,`)
          : undefined,

      ...queryParamsFromProductSearchQuery(parameters.where),

      //   sort: parameters.sort && parameters.sort.by,
      //   sortDir: parameters.sort && parameters.sort.direction,
      //   sortScore: parameters.sort && parameters.sort.score,
      //   sortChannel: parameters.sort && parameters.sort.channel,
      page: parameters.pagination && parameters.pagination.page,
      perPage: parameters.pagination && parameters.pagination.perPage,
      campaignKey: parameters.campaignKey,
    },
  };
}
