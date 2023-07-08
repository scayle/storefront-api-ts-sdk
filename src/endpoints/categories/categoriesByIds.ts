import {BapiCall} from '../../helpers/execute';
import {Category} from '../../types/Category';
import {CategoryEndpointsParameters, parametersForCategoryEndpoint} from './categoryEndpointsParameter';
import {CategoryPropertiesWith} from './CategoryPropertiesWith';

export interface CategoriesByIdsEndpointParameters extends CategoryEndpointsParameters {
  categoryIds: number[];

  with?: {
    // Whether or not to include the parents (up to the root node)
    parents?: 'all';

    // Relative level of children can't be set on this endpoint
    // see https://jira.collins.kg/browse/BAPI-2101
    children?: undefined;

    // The maximum absolute depths of the leaf categories to include
    //
    // If this category has a depth of `n`, and `absoluteDepth <= n` would not include any children
    // Use `absoluteDepth = n + 1` to include 1 level of children etc.
    absoluteDepth?: number;

    // The properties to be included
    //
    // By default no properties will be included
    properties?: CategoryPropertiesWith;
  };

  // `includeHidden` is currently not working on this endpoint
  // see https://jira.collins.kg/browse/BAPI-413
  includeHidden?: undefined;
}

export type CategoriesByIdsEndpointResponseData = Category[];

/**
 * Retrieve categories by their IDs
 *
 * The `with.children` parameter on this endpoint is not supported,
 * use the alternate `with.absoluteDepth` instead.
 **/
export function createCategoriesByIdsEndpointRequest(
  parameters: CategoriesByIdsEndpointParameters,
): BapiCall<CategoriesByIdsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/categories`,
    params: {
      ids: parameters.categoryIds.join(`,`),
      ...parametersForCategoryEndpoint({
        ...parameters,
        with: {
          ...parameters.with,

          // Set children here to `absoluteDepth - 1` as we map from absolute depth to `levels of children` depth
          // (meaning `+1` will be added again further down the call chain)
          children:
            parameters.with?.absoluteDepth !== undefined ? Math.max(parameters.with.absoluteDepth - 1, 0) : undefined,
        },
      }),
    },
  };
}
