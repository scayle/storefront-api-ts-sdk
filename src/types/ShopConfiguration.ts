export interface ShopCustomData {
  [key: string]: unknown | undefined;
}

export interface TenantCustomData {
  [key: string]: unknown | undefined;
}

export type ShopConfiguration = {
  shopId: number;
  name: string;
  properties: Array<{
    key: string;
    value: string;
  }>;
  customData: TenantCustomData;
  shopCustomData: ShopCustomData;
  country: string;
};
