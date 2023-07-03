import {BapiCall} from '../../interfaces/BapiCall';
import {Brand} from '../../types/Brand';

export type BrandByIdEndpointResponseData = Brand;

export function createBrandByIdEndpointRequest(
  brandId: number,
): BapiCall<BrandByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/brands/${brandId}`,
  };
}
