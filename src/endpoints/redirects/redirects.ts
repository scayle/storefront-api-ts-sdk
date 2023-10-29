import {BapiCall} from '../../helpers/execute';
import {Redirect} from '../../types/Redirect';
import {Pagination} from '../products/productsByIds';

export interface GetRedirectsEndpointParameters {
  pagination?: {
    page?: number;
    perPage?: number;
  };
}

export type RedirectsResponse = {
  entities: Redirect[];
  pagination: Pagination;
};

export function createGetRedirectsEndpointRequest(
  parameters: GetRedirectsEndpointParameters,
): BapiCall<RedirectsResponse> {
  return {
    method: 'GET',
    endpoint: `/v1/redirects`,
    params: {
      ...(parameters.pagination && parameters.pagination.page ? {page: parameters.pagination.page} : undefined),
      ...(parameters.pagination && parameters.pagination.perPage
        ? {perPage: parameters.pagination.perPage}
        : undefined),
    },
  };
}

export function createPostRedirectEndpointRequest(url: string): BapiCall<Redirect> {
  return {
    method: 'POST',
    endpoint: '/v1/redirects',
    data: {
      url: url,
    },
  };
}
