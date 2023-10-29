import {BapiCall} from '../../helpers/execute';
import {ShopConfiguration} from '../../types/ShopConfiguration';

export type ShopConfigurationResponse = ShopConfiguration;

export function createShopConfigurationRequest(): BapiCall<ShopConfiguration> {
  return {
    method: 'GET',
    endpoint: '/v1/shop-configuration',
  };
}
