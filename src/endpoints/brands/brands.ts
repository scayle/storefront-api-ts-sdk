import {BapiCall} from '../../helpers/execute';
import {Brand} from '../../types/Brand';
import {InferResponsePagination, RequestPagination, buildRequestPaginationParameters} from '../../types/Pagination';

export type BrandsEndpointResponse<Pagination extends RequestPagination> = {
  pagination: InferResponsePagination<Pagination>;
  entities: Brand[];
};

export type BrandsEndpointRequestParameters<Pagination extends RequestPagination> = {
  pagination?: Pagination;
};

export function createBrandsEndpointRequest<Pagination extends RequestPagination>(
  parameters: BrandsEndpointRequestParameters<Pagination> = {},
): BapiCall<BrandsEndpointResponse<Pagination>> {
  return {
    method: 'GET',
    endpoint: '/v1/brands',
    params: {
      ...buildRequestPaginationParameters(parameters.pagination),
    },
  };
}
