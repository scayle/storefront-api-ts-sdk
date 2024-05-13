import type { Category } from '../..//types/Category'
import type { StorefrontAPICall } from '../../helpers/execute'
import type { CategoryEndpointsParameters } from './categoryEndpointsParameter'
import { parametersForCategoryEndpoint } from './categoryEndpointsParameter'
import type { CategoryPropertiesWith } from './CategoryPropertiesWith'

export interface RootCategoriesEndpointParameters
  extends CategoryEndpointsParameters
{
  with?: {
    // How many levels of children to load
    //
    // 0 means no children, 1 means 1 level of children, etc.
    children?: number

    // The properties to be included
    //
    // By default no properties will be included
    properties?: CategoryPropertiesWith
  }

  // If `true`, hidden categories will be returned
  //
  // This is needed even if the hidden category is requested by ID or slug directly
  includeHidden?: true
}

// Returns a request to load the root categories
//
// Unlike the plain BAPI API, this does not load all children by default
// Use `with.children` to specify how many levels of children to load
export function createCategoriesEndpointRequest(
  params: RootCategoriesEndpointParameters = {},
): StorefrontAPICall<Category[]> {
  return {
    method: 'GET',
    endpoint: '/v1/categories',
    params: {
      ...parametersForCategoryEndpoint(params),
    },
  }
}
