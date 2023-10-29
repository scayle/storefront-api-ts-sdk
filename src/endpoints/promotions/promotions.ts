import {RFC33339Date} from '../../types/Date';
import {BapiCall} from '../../helpers/execute';
import {Promotion} from '../../types/Promotion';
import {PagePaginationRequest, PagePaginationResponse, buildRequestPaginationParameters} from '../../types/Pagination';

export interface PromotionsEndpointResponse {
  pagination: PagePaginationResponse;
  entities: Promotion[];
}

export interface PromotionsEndpointRequestParameters {
  ids?: string[];
  activeAt?: RFC33339Date;
  pagination?: PagePaginationRequest;
}

export function createPromotionsEndpointRequest(
  parameters: PromotionsEndpointRequestParameters = {},
): BapiCall<PromotionsEndpointResponse> {
  return {
    method: 'GET',
    endpoint: '/v1/promotions',
    params: {
      ...buildRequestPaginationParameters(parameters.pagination),
      ...(parameters.ids ? {ids: parameters.ids.join(',')} : undefined),
      ...(parameters.activeAt ? {activeAt: parameters.activeAt} : undefined),
    },
  };
}
