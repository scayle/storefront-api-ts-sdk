import type { StorefrontAPICall } from '../../helpers/execute'

export interface ShopConfigurationResponseData {
  shopId: number
  name: string
  properties: Array<{
    key: string
    value: string
  }>
}

export function createShopConfigurationRequest(): StorefrontAPICall<
  ShopConfigurationResponseData
> {
  return {
    method: 'GET',
    endpoint: '/v1/shop-configuration',
  }
}
