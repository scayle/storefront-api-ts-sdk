import type { StorefrontAPICall } from '../../helpers/execute'
import type { Pagination } from '../products/productsByIds'

export interface GetRedirectsEndpointParameters {
  pagination?: {
    page?: number
    perPage?: number
  }
}

export interface Redirect {
  id: number
  source: string
  target: string
  statusCode: number
}

export interface RedirectsResponseData {
  entities: Redirect[]
  pagination: Pagination
}

export function createGetRedirectsEndpointRequest(
  parameters: GetRedirectsEndpointParameters,
): StorefrontAPICall<RedirectsResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/redirects`,
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

export function createPostRedirectEndpointRequest(
  url: string,
): StorefrontAPICall<Redirect> {
  return {
    method: 'POST',
    endpoint: '/v1/redirects',
    data: {
      url,
    },
  }
}
