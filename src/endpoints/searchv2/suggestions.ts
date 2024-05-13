import type { StorefrontAPICall } from '../../helpers/execute'
import type { SearchEntity } from '../../types/Search'
import type { SearchV2With } from './includes'
import { searchV2WithParamsToQuery } from './includes'

export interface SearchV2SuggestionsEndpointParameters {
  term: string
  categoryId?: number
  with?: SearchV2With
}

export interface SearchV2SuggestionsEndpointResponseData {
  suggestions: SearchEntity[]
}

export function createSearchV2SuggestionsEndpointRequest(
  parameters: SearchV2SuggestionsEndpointParameters,
): StorefrontAPICall<SearchV2SuggestionsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v2/search/suggestions`,
    params: {
      term: parameters.term,
      ...(parameters.categoryId
        ? { campaignKey: parameters.categoryId }
        : undefined),
      ...searchV2WithParamsToQuery(parameters.with),
    },
  }
}
