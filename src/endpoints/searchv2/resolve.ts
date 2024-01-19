import {BapiCall} from '../../interfaces/BapiCall';
import {SearchEntity} from '../../types/Search';
import {SearchV2With, searchV2WithParamsToQuery} from './includes';

export interface SearchV2ResolveEndpointParameters {
  term: string;
  categoryId?: number;
  with?: SearchV2With;
}

export type SearchV2ResolveEndpointResponseData = SearchEntity;

export function createSearchV2ResolveEndpointRequest(
  parameters: SearchV2ResolveEndpointParameters,
): BapiCall<SearchV2ResolveEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v2/search/resolve`,
    params: {
      term: parameters.term,
      ...(parameters.categoryId
        ? {categoryId: parameters.categoryId}
        : undefined),
      ...searchV2WithParamsToQuery(parameters.with),
    },
  };
}
