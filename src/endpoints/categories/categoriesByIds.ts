import type { StorefrontAPICall } from '../../helpers/execute'
import type { Category } from '../../types/Category'
import type { CategoryEndpointsParameters } from './categoryEndpointsParameter'
import { parametersForCategoryEndpoint } from './categoryEndpointsParameter'
import type { CategoryPropertiesWith } from './CategoryPropertiesWith'

export interface CategoriesByIdsEndpointParameters
  extends CategoryEndpointsParameters
{
  categoryIds: number[]

  with?: {
    // Whether or not to include the parents (up to the root node)
    parents?: 'all'

    // How many levels of children to load
    //
    // 0 means no children, 1 means 1 level of children, etc.
    children?: number

    // The properties to be included
    //
    // By default no properties will be included
    properties?: CategoryPropertiesWith
  }

  // `includeHidden` is currently not working on this endpoint
  // see https://jira.collins.kg/browse/BAPI-413
  includeHidden?: undefined
}

/**
 * Retrieve categories by their IDs
 *
 * The `with.children` parameter on this endpoint is not supported,
 * use the alternate `with.absoluteDepth` instead.
 */
export function createCategoriesByIdsEndpointRequest(
  parameters: CategoriesByIdsEndpointParameters,
): StorefrontAPICall<Category[]> {
  return {
    method: 'GET',
    endpoint: '/v1/categories',
    params: {
      ids: parameters.categoryIds.join(','),
      ...parametersForCategoryEndpoint(parameters),
    },
  }
}
