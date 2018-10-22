import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiCategory} from 'bapi/types/BapiCategory';
import {
  categoryWithQueryParameters,
  CategoryWith,
} from 'bapi/types/CategoryWith';

export interface RootCategoriesEndpointParameters {
  with?: CategoryWith;
}

export function createCategoriesEndpointRequest(
  params: RootCategoriesEndpointParameters = {},
): BapiCall<BapiCategory[]> {
  return {
    method: 'GET',
    endpoint: `categories`,
    params: {
      ...categoryWithQueryParameters(params.with),
      showHidden:
        params.with &&
        params.with.children &&
        params.with.children.includeHidden
          ? 'true'
          : undefined,
    },
  };
}
