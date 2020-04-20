import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiCategory} from 'bapi/types/BapiCategory';
import {
  CategoryEndpointsParameters,
  parametersForCategoryEndpoint,
} from './categoryEndpointsParameter';

export interface CategoriesByIdsEndpointParameters
  extends CategoryEndpointsParameters {
  categoryIds: number[];

  with?: {
    // Whether or not to include the parents (up to the root node)
    parents?: 'all';

    // How many levels of children to load
    //
    // 0 means no children, 1 means 1 level of children, etc.
    children?: number;
  };

  // `includeHidden` is currently not working on this endpoint
  // see https://jira.collins.kg/browse/BAPI-413
  includeHidden?: undefined;
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
      ...parametersForCategoryEndpoint(parameters),
    },
  };
}
