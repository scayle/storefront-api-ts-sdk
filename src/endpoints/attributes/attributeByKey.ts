import type { StorefrontAPICall } from '../../helpers/execute'
import type { AttributeGroupMulti } from '../../types/Product'

export type AttributeByKeyEndpointResponseData = AttributeGroupMulti

export function createAttributeByKeyEndpointRequest(
  key: string,
): StorefrontAPICall<AttributeByKeyEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/attributes/${key}`,
  }
}
