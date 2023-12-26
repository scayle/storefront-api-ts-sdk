import {BapiCall} from '../../helpers/execute';
import {Campaign} from '../../types/Campaign';
import {InferResponsePagination, RequestPagination, buildRequestPaginationParameters} from '../../types/Pagination';
import {SortOrder, CampaignSortOption} from '../../types/Sorting';

export type CampaignsEndpointResponse<Pagination extends RequestPagination> = {
  pagination: InferResponsePagination<Pagination>;
  entities: Campaign[];
};

export type CampaignsSortConfig = {
  by?: CampaignSortOption;
  direction?: SortOrder;
};

export type CampaignsEndpointRequestParameters<Pagination extends RequestPagination> = {
  sort?: CampaignsSortConfig;
  pagination?: Pagination;
};

export function createCampaignsEndpointRequest<Pagination extends RequestPagination>(
  parameters: CampaignsEndpointRequestParameters<Pagination> = {},
): BapiCall<CampaignsEndpointResponse<Pagination>> {
  return {
    method: 'GET',
    endpoint: '/v1/campaigns',
    params: {
      ...(parameters.sort && parameters.sort.by ? {sort: parameters.sort.by} : undefined),
      ...(parameters.sort && parameters.sort.direction ? {sortDir: parameters.sort.direction} : undefined),

      ...buildRequestPaginationParameters(parameters.pagination),
    },
  };
}
