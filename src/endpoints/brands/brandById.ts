import {BapiCall} from '../../helpers/execute';
import {Brand} from '../../types/Brand';

export type BrandByIdEndpointResponse = Brand;

export function createBrandByIdEndpointRequest(brandId: number): BapiCall<BrandByIdEndpointResponse> {
  return {
    method: 'GET',
    endpoint: `/v1/brands/${brandId}`,
  };
}
