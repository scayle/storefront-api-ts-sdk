import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiCategory} from 'bapi/types/BapiCategory';
import {
  CategoryEndpointsParameters,
  parametersForCategoryEndpoint,
} from './categoryEndpointsParameter';

export interface CategoryBySlugEndpointParameters
  extends CategoryEndpointsParameters {
  slugPath: string[];

  with?: {
    // Whether or not to include the parents (up to the root node)
    parents?: 'all';

    // How many levels of children to load
    //
    // 0 means no children, 1 means 1 level of children, etc.
    children?: number;
  };

  // If `true`, hidden categories will be returned
  //
  // This is needed even if the hidden category is requested by ID or slug directly
  includeHidden?: true;
}

export type CategoryBySlugEndpointResponseData = BapiCategory;

export function createCategoryBySlugEndpointRequest(
  params: CategoryBySlugEndpointParameters,
): BapiCall<CategoryBySlugEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `categories/${params.slugPath.join(`/`)}`,
    params: {
      ...parametersForCategoryEndpoint(params),
    },
  };
}
