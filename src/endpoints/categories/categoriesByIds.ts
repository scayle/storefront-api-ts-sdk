import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiCategory} from 'bapi/types/BapiCategory';

export interface CategoriesByIdsEndpointParameters {
  categoryIds: number[];
  depth?: number;
}

export type CategoriesByIdsEndpointResponseData = BapiCategory[];

export function createCategoriesByIdsEndpointRequest(
  parameters: CategoriesByIdsEndpointParameters,
): BapiCall<CategoriesByIdsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `categories`,
    params: {
      ids: parameters.categoryIds.join(`,`),
      with: parameters.depth && parameters.depth > 1 ? 'children' : undefined,
      depth: parameters.depth,
      // TODO: `showHidden` not implemented correctly yet, see https://jira.collins.kg/browse/BAPI-413
    },
  };
}
