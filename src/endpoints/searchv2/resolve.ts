import type { StorefrontAPICall } from '../../helpers/execute'
import type { SearchEntity } from '../../types/Search'
import type { SearchV2With } from './includes'
import { searchV2WithParamsToQuery } from './includes'

export interface SearchV2ResolveEndpointParameters {
  term: string
  categoryId?: number
  with?: SearchV2With
}

export type SearchV2ResolveEndpointResponseData = SearchEntity

export function createSearchV2ResolveEndpointRequest(
  parameters: SearchV2ResolveEndpointParameters,
): StorefrontAPICall<SearchV2ResolveEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v2/search/resolve`,
    successfulResponseCodes: [200],
    params: {
      term: parameters.term,
      ...(parameters.categoryId
        ? { categoryId: parameters.categoryId }
        : undefined),
      ...searchV2WithParamsToQuery(parameters.with),
    },
  }
}
