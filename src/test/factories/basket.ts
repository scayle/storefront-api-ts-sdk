import { Factory } from 'fishery'
import {
  variantFactory,
  productFactory,
  automaticDiscountPromotionFactory,
} from '.'
import type {
  BasketItemPrice,
  BasketItem,
  BasketTotalPrice,
} from '../../endpoints/basket/getBasket'
import type { CentAmount } from '../../types/Product'

export const basketItemPriceFactory: Factory<BasketItemPrice> = Factory.define<
  BasketItemPrice
>(() => ({
  currencyCode: 'USD',
  withoutTax: 2 as CentAmount,
  withTax: 100 as CentAmount,
  appliedReductions: [],
}))

export const basketItemFactory: Factory<BasketItem> = Factory.define<
  BasketItem
>(() => ({
  key: 'basket-item-base-key',
  packageId: 1,
  quantity: 1,
  status: 'available',
  displayData: {},
  availableQuantity: 1,
  customData: {},
  lowestPriorPrice: {
    withTax: null,
    relativeDifferenceToPrice: null,
  },
  price: {
    total: basketItemPriceFactory.build(),
    unit: basketItemPriceFactory.build(),
  },
  variant: variantFactory.build({ id: 1 }),
  product: productFactory.build({ id: 1 }),
  itemGroup: undefined,
  promotionId: undefined,
  promotionCode: null,
  promotion: undefined,
}))

export const basketItemsFactory: Factory<BasketItem[]> = Factory.define<
  BasketItem[]
>(() => [
  basketItemFactory.build({
    key: 'basket-item-test-1',
    price: {
      total: basketItemPriceFactory.build({
        currencyCode: 'EUR',
        withTax: 0,
        withoutTax: 0,
        appliedReductions: [
          {
            category: 'sale',
            type: 'relative',
            amount: {
              relative: 0.3,
              absoluteWithTax: 1000 as CentAmount,
            },
          },
        ],
      }),
      unit: basketItemPriceFactory.build({
        currencyCode: 'EUR',
        withTax: 0,
        withoutTax: 0,
        appliedReductions: [
          {
            category: 'sale',
            type: 'relative',
            amount: {
              relative: 0.3,
              absoluteWithTax: 1000 as CentAmount,
            },
          },
        ],
      }),
    },
  }),
  basketItemFactory.build({
    key: 'basket-item-test-2',
    price: {
      total: basketItemPriceFactory.build({
        currencyCode: 'EUR',
        withTax: 0,
        withoutTax: 0,
        appliedReductions: [
          {
            category: 'campaign',
            type: 'relative',
            amount: {
              relative: 0.3,
              absoluteWithTax: 1000 as CentAmount,
            },
          },
        ],
      }),
      unit: basketItemPriceFactory.build({
        currencyCode: 'EUR',
        withTax: 0,
        withoutTax: 0,
        appliedReductions: [
          {
            category: 'campaign',
            type: 'relative',
            amount: {
              relative: 0.3,
              absoluteWithTax: 1000 as CentAmount,
            },
          },
        ],
      }),
    },
  }),
  basketItemFactory.build({
    key: 'basket-item-test-3',
    price: {
      total: basketItemPriceFactory.build({
        currencyCode: 'EUR',
        withTax: 0,
        withoutTax: 0,
        appliedReductions: [
          {
            category: 'campaign',
            type: 'relative',
            amount: {
              relative: 0.3,
              absoluteWithTax: 1000 as CentAmount,
            },
          },
        ],
      }),
      unit: basketItemPriceFactory.build({
        currencyCode: 'EUR',
        withTax: 0,
        withoutTax: 0,
        appliedReductions: [
          {
            category: 'campaign',
            type: 'relative',
            amount: {
              relative: 0.3,
              absoluteWithTax: 1000 as CentAmount,
            },
          },
        ],
      }),
    },
  }),
  basketItemFactory.build({
    key: 'basket-item-test-4',
    price: {
      total: basketItemPriceFactory.build({
        currencyCode: 'EUR',
        withTax: 3592,
        withoutTax: 1796,
        appliedReductions: [
          {
            category: 'sale',
            type: 'relative',
            amount: {
              relative: 0.5,
              absoluteWithTax: 4500 as CentAmount,
            },
          },
          {
            category: 'promotion',
            type: 'relative',
            amount: {
              relative: 0.2,
              absoluteWithTax: 898 as CentAmount,
            },
          },
        ],
      }),
      unit: basketItemPriceFactory.build({
        currencyCode: 'EUR',
        withTax: 3592,
        withoutTax: 1796,
        appliedReductions: [
          {
            category: 'sale',
            type: 'relative',
            amount: {
              relative: 0.5,
              absoluteWithTax: 4500 as CentAmount,
            },
          },
          {
            category: 'promotion',
            type: 'relative',
            amount: {
              relative: 0.2,
              absoluteWithTax: 898 as CentAmount,
            },
          },
        ],
      }),
    },
    promotionId: '66951046684cc17335766008',
    promotion: automaticDiscountPromotionFactory.build(),
  }),
])

export const costFactory: Factory<BasketTotalPrice> = Factory.define<
  BasketTotalPrice
>(() => ({
  currencyCode: 'EUR',
  withTax: 20082 as CentAmount,
  withoutTax: 10041 as CentAmount,
  recommendedRetailPrice: null,
  tax: {
    vat: {
      amount: 10041 as CentAmount,
      rate: 0,
    },
  },
  appliedReductions: [
    {
      category: 'sale',
      type: 'relative',
      amount: {
        relative: 0.26,
        absoluteWithTax: 8500 as CentAmount,
      },
    },
    {
      category: 'promotion',
      type: 'relative',
      amount: {
        relative: 0.13,
        absoluteWithTax: 3188 as CentAmount,
        absoluteTax: 1594,
        absoluteWithoutTax: 1594,
      },
    },
  ],
}))
