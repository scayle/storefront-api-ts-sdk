import {BapiCall} from '../../helpers/execute';
import {Brand} from '../../types/Brand';

export type BrandBySlugEndpointResponse = Brand;

export function createBrandBySlugEndpointRequest(slug: string): BapiCall<BrandBySlugEndpointResponse> {
  return {
    method: 'GET',
    endpoint: `/v1/brands/${slug}`,
  };
}
