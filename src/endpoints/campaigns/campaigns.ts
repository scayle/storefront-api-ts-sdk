import {BapiCall} from 'bapi/interfaces/BapiCall';
import {APISortOrder} from 'bapi/endpoints/products/products';
import {Pagination} from 'bapi/endpoints/products/productsByIds';
import {Campaign} from 'bapi/types/campaign';

export type CampaignsEndpointResponseData = {
  pagination: Pagination;
  entities: Campaign[];
};

export enum CampaignSortOption {
  Id = 'id',
  Reduction = 'reduction',
  StartAt = 'start_at',
  EndAt = 'end_at',
}

export interface CampaignsSortConfig {
  by?: CampaignSortOption;
  direction?: APISortOrder;
}

export interface CampaignsEndpointRequestParameters {
  sort?: CampaignsSortConfig;
  pagination?: {
    page?: number;
    perPage?: number;
  };
}

export function createCampaignsEndpointRequest(
  parameters: CampaignsEndpointRequestParameters = {},
): BapiCall<CampaignsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: 'campaigns',
    params: {
      ...(parameters.sort && parameters.sort.by
        ? {sort: parameters.sort.by}
        : undefined),
      ...(parameters.sort && parameters.sort.direction
        ? {sortDir: parameters.sort.direction}
        : undefined),

      ...(parameters.pagination && parameters.pagination.page
        ? {page: parameters.pagination.page}
        : undefined),
      ...(parameters.pagination && parameters.pagination.perPage
        ? {perPage: parameters.pagination.perPage}
        : undefined),
    },
  };
}
