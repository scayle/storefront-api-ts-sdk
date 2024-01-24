import {BapiCall} from '../../interfaces/BapiCall';

export interface ShopConfigurationResponseData {
  shopId: number;
  name: string;
  properties: Array<{
    key: string;
    value: string;
  }>;
}

export function createShopConfigurationRequest(): BapiCall<ShopConfigurationResponseData> {
  return {
    method: 'GET',
    endpoint: 'shop-configuration',
  };
}
