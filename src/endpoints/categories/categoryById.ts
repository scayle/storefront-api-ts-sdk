import {BapiCall} from '../../interfaces/BapiCall';
import {BapiCategory} from '../../types/BapiCategory';
import {
  CategoryEndpointsParameters,
  parametersForCategoryEndpoint,
} from './categoryEndpointsParameter';
import {CategoryPropertiesWith} from './CategoryPropertiesWith';

export interface CategoryByIdEndpointParameters
  extends CategoryEndpointsParameters {
  categoryId: number;

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

export type CategoryByIdEndpointResponseData = BapiCategory;

export function createCategoryByIdEndpointRequest(
  params: CategoryByIdEndpointParameters,
): BapiCall<CategoryByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `categories/${params.categoryId}`,
    params: {
      ...parametersForCategoryEndpoint(params),
    },
  };
}
