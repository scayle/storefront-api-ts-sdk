import type { StorefrontAPICall } from '../../helpers/execute'
import type { Category } from '../../types/Category'
import type { CategoryEndpointsParameters } from './categoryEndpointsParameter'
import { parametersForCategoryEndpoint } from './categoryEndpointsParameter'
import type { CategoryPropertiesWith } from './CategoryPropertiesWith'

export interface CategoryBySlugEndpointParameters
  extends CategoryEndpointsParameters
{
  slugPath: string[]

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

  // If `true`, hidden categories will be returned
  //
  // This is needed even if the hidden category is requested by ID or slug directly
  includeHidden?: true
}

export function createCategoryBySlugEndpointRequest(
  params: CategoryBySlugEndpointParameters,
): StorefrontAPICall<Category> {
  return {
    method: 'GET',
    endpoint: `/v1/categories/${params.slugPath.join('/')}`,
    params: {
      ...parametersForCategoryEndpoint(params),
    },
  }
}
