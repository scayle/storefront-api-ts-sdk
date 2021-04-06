import {BapiCall} from 'bapi/interfaces/BapiCall';

export interface SearchResolveEndpointParameters {
  term: string;
}

export type SearchResolveEndpointResponseData = {
  matches: Array<{
    // product count
    count: number;
    match: string;
    category: {
      match: string;
      id: number;
      name: string;
    };
    attributes: Array<{
      match: string;
      name: string;
      attributeGroup: number;
      attributeId: number;
    }>;
  }>;
};

export function createSearchResolveEndpointRequest(
  parameters: SearchResolveEndpointParameters,
): BapiCall<SearchResolveEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `search/resolve`,
    params: {
      term: parameters.term,
    },
  };
}
