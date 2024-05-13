import type { StorefrontAPICall } from '../../helpers/execute'
import type { Brand } from '../../types/Brand'

export type BrandBySlugEndpointResponseData = Brand

export function createBrandBySlugEndpointRequest(
  slug: string,
): StorefrontAPICall<BrandBySlugEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/brands/${slug}`,
    params: {
      forceSlug: true,
    },
  }
}
