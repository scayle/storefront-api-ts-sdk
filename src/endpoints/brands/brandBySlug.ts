import {BapiCall} from 'bapi/interfaces/BapiCall';
import {Brand} from 'bapi/types/Brand';

export type BrandBySlugEndpointResponseData = Brand;

export function createBrandBySlugEndpointRequest(
  slug: string,
): BapiCall<BrandBySlugEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `brands/${slug}`,
  };
}
