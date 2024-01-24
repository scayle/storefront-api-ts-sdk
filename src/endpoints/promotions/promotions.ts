import {RFC33339Date} from '../../types/BapiProduct';
import {BapiCall} from '../../interfaces/BapiCall';
import {Pagination} from '../products/productsByIds';
import {Promotion} from '../../types/Promotion';

export interface PromotionsEndpointResponseData {
  pagination: Pagination;
  entities: Promotion[];
}

export interface PromotionsEndpointRequestParameters {
  ids?: string[];
  activeAt?: RFC33339Date;
  pagination?: {
    page?: number;
    perPage?: number;
  };
}

export function createPromotionsEndpointRequest(
  parameters: PromotionsEndpointRequestParameters = {},
): BapiCall<PromotionsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: 'promotions',
    params: {
      ...(parameters.pagination && parameters.pagination.page
        ? {page: parameters.pagination.page}
        : undefined),
      ...(parameters.pagination && parameters.pagination.perPage
        ? {perPage: parameters.pagination.perPage}
        : undefined),
      ...(parameters.ids ? {ids: parameters.ids.join(',')} : undefined),
      ...(parameters.activeAt ? {activeAt: parameters.activeAt} : undefined),
    },
  };
}
