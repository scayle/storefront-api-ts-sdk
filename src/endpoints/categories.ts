import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiCategory} from 'bapi/types/BapiCategory';

export function createCategoriesEndpointRequest(): BapiCall<BapiCategory[]> {
  return {
    method: 'GET',
    endpoint: `categories`,
    params: {
      depth: 1,
    },
  };
}
