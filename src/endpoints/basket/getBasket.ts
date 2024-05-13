import type { Promotion } from '../../types/Promotion'
import { prefixList } from '../../helpers/attributes'
import type { Product, Variant, VariantPrice } from '../../types/Product'
import type { ProductWith, VariantWith } from '../../types/ProductWith'
import {
  productWithQueryParameterValues,
  variantWithQueryParameterValues,
} from '../../types/ProductWith'
import type { StorefrontAPICall } from '../../helpers/execute'

export type BasketItemPrice = Omit<VariantPrice, 'tax'>

export type BasketTotalPrice = Omit<VariantPrice, 'tax' | 'reference'>

export type BasketKey = string & {
  readonly ____tagBasketKey: unique symbol
}

export interface BasketResponseData<P = Product, V = Variant> {
  key: BasketKey
  cost: BasketTotalPrice
  currencyCode: 'EUR'
  items: BasketItem<P, V>[]

  packages: BasketPackageInformation[]

  applicablePromotions?: ApplicablePromotion[]
}

export interface ApplicablePromotion {
  // The item ID on which the promotion is applicable for
  //
  // For buy_x_get_y effects where the free gift is not in the basket this key will not be defined.
  itemId?: string
  promotion: Promotion
}

export interface ItemGroup {
  id: string
  isMainItem: boolean
  isRequired: boolean
}

export interface BasketItem<P = Product, V = Variant> {
  key: string
  customData: unknown
  packageId: number
  price: {
    total: BasketItemPrice
    unit: BasketItemPrice
  }
  quantity: number
  availableQuantity?: number
  deliveryForecast?: {
    deliverable?: {
      quantity: number
      key: string
    }
    subsequentDelivery?: {
      quantity: number
      key: string
    }
  }
  status: 'available' | 'unavailable' | 'deleted'
  product: P
  variant: V
  displayData: BasketItemDisplayData
  itemGroup?: ItemGroup
  promotionId?: string
  promotion?: Promotion & {
    isValid: boolean
    failedConditions: Array<{
      key: string
      level: 'item' | 'global'
    }>
  }
}

export interface BaskteItemDisplayDataItem {
  value: string
  label: string
  key: string
}

export type BasketItemDisplayDataKey =
  | 'meta'
  | 'name'
  | 'identifier'
  | 'attribute-1'
  | 'attribute-2'
  | 'attribute-3'

export type BasketItemDisplayData = Partial<
  Record<BasketItemDisplayDataKey, BaskteItemDisplayDataItem>
>

export interface BasketPackageInformation {
  id: number
  carrierKey: string
  deliveryDate: {
    // Date like '2018-02-05'
    max: string
    // Date like '2018-02-02'
    min: string
  }
}

export interface BasketWith {
  items?: {
    product?: ProductWith
    variant?: VariantWith
    promotion?: boolean
  }
  applicablePromotions?: boolean
}

export function basketWithQueryParameter(basketWith: BasketWith): string[] {
  const withParams = []

  if (basketWith.items && basketWith.items.product) {
    withParams.push(
      ...productWithQueryParameterValues(basketWith.items.product).map(
        value => `items.product.${value}`,
      ),
    )
  }

  if (basketWith.items && basketWith.items.variant) {
    withParams.push(
      ...prefixList(`items.variant.`)(
        variantWithQueryParameterValues(basketWith.items.variant),
      ),
    )
  }

  if (basketWith.items?.promotion === true) {
    withParams.push('items.promotion')
  }

  if (basketWith.applicablePromotions === true) {
    withParams.push('applicablePromotions')
  }

  return withParams
}

export interface GetBasketParameters {
  basketKey: string

  with?: BasketWith
  campaignKey?: string

  // The shop ID to be used for reading the basket from Checkout
  // Product data will still be attached from the primary `shopId`
  checkoutShopId?: number
  skipAvailabilityCheck?: boolean

  includeItemsWithoutProductData?: boolean
}

export function getBasketEndpointRequest(
  params: GetBasketParameters,
): StorefrontAPICall<BasketResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/baskets/${params.basketKey}`,
    params: {
      ...(params.with
        ? { with: basketWithQueryParameter(params.with).join(',') }
        : undefined),
      ...(params.campaignKey ? { campaignKey: params.campaignKey } : undefined),
      ...(params.checkoutShopId
        ? { checkoutShopId: params.checkoutShopId }
        : undefined),
      ...(params.skipAvailabilityCheck
        ? { skipAvailabilityCheck: params.skipAvailabilityCheck }
        : undefined),
      ...(params.includeItemsWithoutProductData
        ? {
          includeItemsWithoutProductData: params.includeItemsWithoutProductData,
        }
        : undefined),
    },
  }
}
