export interface CategoryProperty {
  name: string
  value: string | number | null
}

export interface CategoryShopCustomData {
  [key: string]: unknown | undefined
}

export interface CategoryCountryCustomData {
  [key: string]: unknown | undefined
}

export interface Category {
  id: number
  path: string
  name: string
  slug: string
  parentId: number
  rootlineIds: number[]
  childrenIds: number[]
  properties: CategoryProperty[]
  isHidden: boolean
  children?: Category[]
  parent?: Category
  depth: number
  supportedFilter: string[]

  shopLevelCustomData: CategoryShopCustomData
  countryLevelCustomData: CategoryCountryCustomData
}
