import {BapiCall} from 'bapi/interfaces/BapiCall';

export interface SearchMappingsEndpointParameters {
  term: string;
}

export type SearchMappingsEndpointResponseData = {
  matches: Array<
    | {
        type: 'attribute';
        attributeGroup: {id: number; slug: string};
        attributeIds: number[];
      }
    | {type: 'category'; name: string; id: number}
  >;
};

export function createrSearchMappingsEndpointRequest(
  parameters: SearchMappingsEndpointParameters,
): BapiCall<SearchMappingsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `search/mappings`,
    params: {
      term: parameters.term,
    },
  };
}
