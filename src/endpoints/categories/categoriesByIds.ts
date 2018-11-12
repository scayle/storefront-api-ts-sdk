import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiCategory} from 'bapi/types/BapiCategory';

export interface CategoriesByIdsEndpointParameters {
  categoryIds: number[];
  depth?: number;
}

export type CategoriesByIdsEndpointResponseData = BapiCategory[];

/**
 * Retrieve categories by their IDs
 *
 * Includes the legacy `depth` parameter (1 for the categories itself, 2 for level of children, etc.)
 * and no further parameters, as the backend implementation is not yet fully aligned with the single
 * category by ID endpoint options
 *
 * If no `depth` parameter is provided, the response will include *all* children in the tree
 */
export function createCategoriesByIdsEndpointRequest(
  parameters: CategoriesByIdsEndpointParameters,
): BapiCall<CategoriesByIdsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `categories`,
    params: {
      ids: parameters.categoryIds.join(`,`),
      ...(parameters.depth && parameters.depth > 1
        ? {with: 'children'}
        : undefined),
      ...(parameters.depth !== undefined
        ? {depth: parameters.depth}
        : undefined),
      // TODO: `showHidden` not implemented correctly yet, see https://jira.collins.kg/browse/BAPI-413
    },
  };
}
