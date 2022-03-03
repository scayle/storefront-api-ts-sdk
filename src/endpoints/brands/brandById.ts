import {BapiCall} from 'bapi/interfaces/BapiCall';
import {Brand} from 'bapi/types/Brand';

export type BrandByIdEndpointResponseData = Brand;

export function createBrandByIdEndpointRequest(
  brandId: number,
): BapiCall<BrandByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `brands/${brandId}`,
  };
}
