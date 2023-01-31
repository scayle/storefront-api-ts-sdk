import {BapiCall} from 'bapi/interfaces/BapiCall';
import {Pagination} from '../products/productsByIds';

export interface GetRedirectsEndpointParameters {
  pagination?: {
    page?: number;
    perPage?: number;
  };
}

export type Redirect = {
  id: number;
  source: string;
  target: string;
  statusCode: number;
};

export type RedirectsResponseData = {
  entities: Redirect[];
  pagination: Pagination;
};

export function createGetRedirectsEndpointRequest(
  parameters: GetRedirectsEndpointParameters,
): BapiCall<RedirectsResponseData> {
  return {
    method: 'GET',
    endpoint: `redirects`,
    params: {
      ...(parameters.pagination && parameters.pagination.page
        ? {page: parameters.pagination.page}
        : undefined),
      ...(parameters.pagination && parameters.pagination.perPage
        ? {perPage: parameters.pagination.perPage}
        : undefined),
    },
  };
}

export function createPostRedirectEndpointRequest(
  url: string,
): BapiCall<Redirect> {
  return {
    method: 'POST',
    endpoint: 'redirects',
    data: {
      url: url,
    },
  };
}
