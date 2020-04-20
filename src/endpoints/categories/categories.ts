import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiCategory} from 'bapi/types/BapiCategory';
import {
  CategoryEndpointsParameters,
  parametersForCategoryEndpoint,
} from './categoryEndpointsParameter';

export interface RootCategoriesEndpointParameters
  extends CategoryEndpointsParameters {
  with?: {
    // How many levels of children to load
    //
    // 0 means no children, 1 means 1 level of children, etc.
    children?: number;
  };

  // 1 means just the requested categories, 2 means requested categories and 1 level of children, etc.
  depth?: number;

  // If `true`, hidden categories will be returned
  //
  // This is needed even if the hidden category is requested by ID or slug directly
  includeHidden?: true;
}

// Returns a request to load the root categories
//
// By default includes all children if no
export function createCategoriesEndpointRequest(
  params: RootCategoriesEndpointParameters = {},
): BapiCall<BapiCategory[]> {
  return {
    method: 'GET',
    endpoint: `categories`,
    params: {
      ...parametersForCategoryEndpoint(params),
    },
  };
}
