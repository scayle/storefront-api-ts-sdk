import {BapiCall} from '../..//interfaces/BapiCall';
import {BapiCategory} from '../..//types/BapiCategory';
import {
  CategoryEndpointsParameters,
  parametersForCategoryEndpoint,
} from './categoryEndpointsParameter';
import {CategoryPropertiesWith} from './CategoryPropertiesWith';

export interface RootCategoriesEndpointParameters
  extends CategoryEndpointsParameters {
  with?: {
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

// Returns a request to load the root categories
//
// Unlike the plain BAPI API, this does not load all children by default
// Use `with.children` to specify how many levels of children to load
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
