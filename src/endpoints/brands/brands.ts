import {BapiCall} from '../../helpers/execute';
import {Pagination} from '../products/productsByIds';
import {Brand} from '../../types/Brand';

export interface BrandsEndpointResponseData {
  pagination: Pagination;
  entities: Brand[];
}

export interface BrandsEndpointRequestParameters {
  pagination?: {
    page?: number;
    perPage?: number;
  };
}

export function createBrandsEndpointRequest(
  parameters: BrandsEndpointRequestParameters = {},
): BapiCall<BrandsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: '/v1/brands',
    params: {
      ...(parameters.pagination && parameters.pagination.page ? {page: parameters.pagination.page} : undefined),
      ...(parameters.pagination && parameters.pagination.perPage
        ? {perPage: parameters.pagination.perPage}
        : undefined),
    },
  };
}
