import { Factory } from 'fishery'
import { PromotionEffectType } from '../../types/Promotion'
import type { Promotion } from '../../types/Promotion'
import type { RFC33339Date } from '../../types/Product'
import type { BasketItem } from '../../endpoints/basket/getBasket'

export const automaticDiscountPromotionFactory = Factory.define<
  Promotion | BasketItem['promotion']
>(
  () => ({
    id: '66951014684cc17335766006',
    name: 'Automatic discount',
    effect: {
      type: PromotionEffectType.AutomaticDiscount,
      additionalData: {
        type: 'relative',
        value: 10,
      },
    },
    conditions: [
      {
        level: 'global',
        key:
          'panels_automatic-discount_any_products_condition_e5b66afa5eacabdb6bb855c6a9344db49cc372b4',
        condition: 'size(payload.items) \u003E= 1',
      },
      {
        level: 'global',
        key: 'panels_automatic-discount_minimum_order_amount_10000',
        condition: 'payload.totals.withTax \u003E= 10000',
      },
    ],
    schedule: {
      from: '2024-07-15T10:00:00Z' as RFC33339Date,
      to: '2025-04-01T10:00:00Z' as RFC33339Date,
    },
    isActive: true,
    priority: 1,
    customData: {
      colorHex: '#a4c639',
      product: {
        badgeLabel: 'Get -10% Off',
        promotionId: 2476,
      },
      terms:
        'The promotion applies to Jackets products. If you buy 1 or more jacket products that are worth over 100€, you will get 10% discount on your order. The promotion lasts till the end of April 1st, 2024.',
      category: {
        ctaLabel: 'Jacket Deals',
        id: 50353,
      },
      corePanel: {
        viewType: 'automatic-discount',
      },
      headlineParts: [
        'Autumn Jacket Campaign',
        'Buy jacket(s) worth 100€ & get 10% off',
      ],
      minOrderValue: 10000,
    },
  }),
)

export const buyXgetYPromotionFactory = Factory.define<
  Promotion | BasketItem['promotion']
>(() => ({
  id: '77962bd0684cc1733576601d',
  effect: {
    type: PromotionEffectType.BuyXGetY,
    additionalData: {
      maxCount: 1,
      variantIds: [
        1,
        2,
        3,
      ],
    },
  },
  conditions: [
    {
      level: 'global',
      key: 'attribute_condition',
      condition:
        "size(payload.items.filter(item, 'promotion' in item.product.attributes && (2477 in item.product.attributes['promotion']))) >= 1",
    },
  ],
  schedule: {
    from: '2024-07-15T10:00:00Z' as RFC33339Date,
    to: '2025-04-01T10:00:00Z' as RFC33339Date,
  },
  isActive: true,
  priority: 1,
  name: 'Free Caps',
  customData: {
    category: {
      ctaLabel: 'Sneakers',
      id: 50344,
    },
    colorHex: '#6699cc',
    giftConditions: {
      minQuantity: 1,
    },
    headlineParts: [
      'Free Gift Deal',
      'Buy sneakers, and get a free cap',
    ],
    product: {
      badgeLabel: 'Get a Cap',
      promotionId: 2477,
    },
    terms:
      "By buying one of the sneakers tagged with the badge 'Get a Cap', you can get a free cap. The promotion lasts till the end of March 2025.",
  },
}))
