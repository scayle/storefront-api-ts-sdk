export interface ShopConfigurationResponse {
  shopId: number;
  name: string;
  properties: Array<{
    key: string;
    value: string;
  }>;
  customData: Partial<Record<string, unknown>>;
  shopCustomData: Partial<Record<string, unknown>>;
  country: string;
}
