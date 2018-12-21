import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiCategory} from 'bapi/types/BapiCategory';
import {
  CategoryWith,
  categoryWithQueryParameters,
} from 'bapi/types/CategoryWith';

export interface CategoryByIdEndpointParameters {
  categoryId: number;
  with?: CategoryWith;
}

export type CategoryByIdEndpointResponseData = BapiCategory;

export function createCategoryByIdEndpointRequest(
  params: CategoryByIdEndpointParameters,
): BapiCall<CategoryByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `categories/${params.categoryId}`,
    params: {
      ...categoryWithQueryParameters(params.with),
    },
  };
}
