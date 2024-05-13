import type { StorefrontAPICall } from '../../helpers/execute'

export interface SearchMappingsEndpointParameters {
  term: string
}

export interface SearchMappingsEndpointResponseData {
  matches: Array<
    | {
      type: 'attribute'
      attributeGroup: { id: number; slug: string }
      attributeIds: number[]
    }
    | { type: 'category'; name: string; id: number }
  >
}

export function createrSearchMappingsEndpointRequest(
  parameters: SearchMappingsEndpointParameters,
): StorefrontAPICall<SearchMappingsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/search/mappings`,
    params: {
      term: parameters.term,
    },
  }
}
