import type { RFC33339Date } from '../../types/Product'
import type { Pagination } from '../products/productsByIds'
import type { Promotion } from '../../types/Promotion'
import type { StorefrontAPICall } from '../../helpers/execute'

export interface PromotionsEndpointResponseData {
  pagination: Pagination
  entities: Promotion[]
}

export interface PromotionsEndpointRequestParameters {
  ids?: string[]
  activeAt?: RFC33339Date
  pagination?: {
    page?: number
    perPage?: number
  }
}

export function createPromotionsEndpointRequest(
  parameters: PromotionsEndpointRequestParameters = {},
): StorefrontAPICall<PromotionsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: '/v1/promotions',
    params: {
      ...(parameters.pagination && parameters.pagination.page
        ? { page: parameters.pagination.page }
        : undefined),
      ...(parameters.pagination && parameters.pagination.perPage
        ? { perPage: parameters.pagination.perPage }
        : undefined),
      ...(parameters.ids ? { ids: parameters.ids.join(',') } : undefined),
      ...(parameters.activeAt ? { activeAt: parameters.activeAt } : undefined),
    },
  }
}
