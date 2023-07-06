import {BapiCall} from '../../helpers/execute';
import {ShopConfigurationResponse} from '../../types/ShopConfiguration';

export function createShopConfigurationRequest(): BapiCall<ShopConfigurationResponse> {
  return {
    method: 'GET',
    endpoint: '/v1/shop-configuration',
  };
}
