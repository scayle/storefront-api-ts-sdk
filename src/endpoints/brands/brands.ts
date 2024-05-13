import type { Pagination } from '../products/productsByIds'
import type { Brand } from '../../types/Brand'
import type { StorefrontAPICall } from '../../helpers/execute'

export interface BrandsEndpointResponseData {
  pagination: Pagination
  entities: Brand[]
}

export interface BrandsEndpointRequestParameters {
  pagination?: {
    page?: number
    perPage?: number
  }
}

export function createBrandsEndpointRequest(
  parameters: BrandsEndpointRequestParameters = {},
): StorefrontAPICall<BrandsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: '/v1/brands',
    params: {
      ...(parameters.pagination && parameters.pagination.page
        ? { page: parameters.pagination.page }
        : undefined),
      ...(parameters.pagination && parameters.pagination.perPage
        ? { perPage: parameters.pagination.perPage }
        : undefined),
    },
  }
}
