import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiCategory} from 'bapi/types/BapiCategory';
import {
  CategoryWith,
  categoryWithQueryParameters,
} from 'bapi/types/CategoryWith';

export interface CategoryBySlugEndpointParameters {
  slugPath: string[];
  with?: CategoryWith;
  showHidden?: boolean;
}

export type CategoryBySlugEndpointResponseData = BapiCategory;

export function createCategoryBySlugEndpointRequest(
  params: CategoryBySlugEndpointParameters,
): BapiCall<CategoryBySlugEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `categories/${params.slugPath.join(`/`)}`,
    params: {
      ...categoryWithQueryParameters(params.with),
      showHidden: params.showHidden === true ? 'true' : undefined,
    },
  };
}
