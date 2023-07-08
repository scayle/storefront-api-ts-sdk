import {CustomData} from './CustomData';

export type ShopConfigurationResponse = {
  shopId: number;
  name: string;
  properties: Array<{
    key: string;
    value: string;
  }>;
  customData: CustomData;
  shopCustomData: CustomData;
  country: string;
};
