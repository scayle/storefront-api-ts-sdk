import type { APISortOrder } from '../../endpoints/products/products'
import type { Pagination } from '../../endpoints/products/productsByIds'
import type { StorefrontAPICall } from '../../helpers/execute'
import type { Campaign } from '../../types/campaign'

export interface CampaignsEndpointResponseData {
  pagination: Pagination
  entities: Campaign[]
}

export enum CampaignSortOption {
  Id = 'id',
  Reduction = 'reduction',
  StartAt = 'start_at',
  EndAt = 'end_at',
}

export interface CampaignsSortConfig {
  by?: CampaignSortOption
  direction?: APISortOrder
}

export interface CampaignsEndpointRequestParameters {
  sort?: CampaignsSortConfig
  pagination?: {
    page?: number
    perPage?: number
  }
}

export function createCampaignsEndpointRequest(
  parameters: CampaignsEndpointRequestParameters = {},
): StorefrontAPICall<CampaignsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: '/v1/campaigns',
    params: {
      ...(parameters.sort && parameters.sort.by
        ? { sort: parameters.sort.by }
        : undefined),
      ...(parameters.sort && parameters.sort.direction
        ? { sortDir: parameters.sort.direction }
        : undefined),

      ...(parameters.pagination && parameters.pagination.page
        ? { page: parameters.pagination.page }
        : undefined),
      ...(parameters.pagination && parameters.pagination.perPage
        ? { perPage: parameters.pagination.perPage }
        : undefined),
    },
  }
}
