import type { StorefrontAPICall } from '../../helpers/execute'
import type { Brand } from '../../types/Brand'

export type BrandByIdEndpointResponseData = Brand

export function createBrandByIdEndpointRequest(
  brandId: number,
): StorefrontAPICall<BrandByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/brands/${brandId}`,
  }
}
