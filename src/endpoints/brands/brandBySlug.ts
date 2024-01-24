import {BapiCall} from '../../interfaces/BapiCall';
import {Brand} from '../../types/Brand';

export type BrandBySlugEndpointResponseData = Brand;

export function createBrandBySlugEndpointRequest(
  slug: string,
): BapiCall<BrandBySlugEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `brands/${slug}`,
    params: {
      forceSlug: true,
    },
  };
}
