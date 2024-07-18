export interface ShopCustomData {
}

export interface ShopCountryCustomData {
}

export interface ShopConfiguration {
  shopId: number
  name: string
  country: string
  customData: ShopCountryCustomData
  shopCustomData: ShopCustomData

  /**
   * Shop `properties` are deprecated and are replaced by custom data.
   *
   * @deprecated
   */
  properties: Array<{
    key: string
    value: string
  }>
}
