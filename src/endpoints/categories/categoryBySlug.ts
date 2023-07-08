import {BapiCall} from '../../helpers/execute';
import {Category} from '../../types/Category';
import {CategoryEndpointsParameters, parametersForCategoryEndpoint} from './categoryEndpointsParameter';
import {CategoryPropertiesWith} from './CategoryPropertiesWith';

export interface CategoryBySlugEndpointParameters extends CategoryEndpointsParameters {
  slugPath: string[];

  with?: {
    // Whether or not to include the parents (up to the root node)
    parents?: 'all';

    // How many levels of children to load
    //
    // 0 means no children, 1 means 1 level of children, etc.
    children?: number;

    // The properties to be included
    //
    // By default no properties will be included
    properties?: CategoryPropertiesWith;
  };

  // If `true`, hidden categories will be returned
  //
  // This is needed even if the hidden category is requested by ID or slug directly
  includeHidden?: true;
}

export type CategoryBySlugEndpointResponseData = Category;

export function createCategoryBySlugEndpointRequest(
  params: CategoryBySlugEndpointParameters,
): BapiCall<CategoryBySlugEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/categories/${params.slugPath.join(`/`)}`,
    params: {
      ...parametersForCategoryEndpoint(params),
    },
    responseValidator: (response): response is Category => typeof response === 'object' && !Array.isArray(response),
  };
}
