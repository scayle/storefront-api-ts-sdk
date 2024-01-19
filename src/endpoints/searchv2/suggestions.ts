import {BapiCall} from '../../interfaces/BapiCall';
import {SearchEntity} from '../../types/Search';
import {SearchV2With, searchV2WithParamsToQuery} from './includes';

export interface SearchV2SuggestionsEndpointParameters {
  term: string;
  categoryId?: number;
  with?: SearchV2With;
}

export type SearchV2SuggestionsEndpointResponseData = {
  suggestions: SearchEntity[];
};

export function createSearchV2SuggestionsEndpointRequest(
  parameters: SearchV2SuggestionsEndpointParameters,
): BapiCall<SearchV2SuggestionsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v2/search/suggestions`,
    params: {
      term: parameters.term,
      ...(parameters.categoryId
        ? {campaignKey: parameters.categoryId}
        : undefined),
      ...searchV2WithParamsToQuery(parameters.with),
    },
  };
}
