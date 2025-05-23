import { Factory } from 'fishery'
import { PromotionEffectType } from '../../types/Promotion'
import type {
  AutomaticDiscountEffect,
  BuyXGetYEffect,
  Promotion,
} from '../../types/Promotion'
import type { Product, RFC3339Date, Variant } from '../../types/Product'
import type { BasketItem } from '../../endpoints/basket/getBasket'

export const automaticDiscountPromotionFactory: Factory<
  | Promotion<AutomaticDiscountEffect>
  | (Promotion<AutomaticDiscountEffect> & {
    isValid: boolean
    failedConditions: Array<{
      key: string
      level: 'item' | 'global'
    }>
  })
> = Factory.define<
  | Promotion<AutomaticDiscountEffect>
  | Required<BasketItem<Product, Variant, AutomaticDiscountEffect>>['promotion']
>(() => ({
  id: '66951014684cc17335766006',
  name: 'Automatic discount',
  effect: {
    type: PromotionEffectType.AUTOMATIC_DISCOUNT,
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
    from: '2024-07-15T10:00:00Z' as RFC3339Date,
    to: '2025-04-01T10:00:00Z' as RFC3339Date,
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
}))

export const buyXGetYPromotionFactory: Factory<
  | Promotion<BuyXGetYEffect>
  | (Promotion<BuyXGetYEffect> & {
    isValid: boolean
    failedConditions: Array<{
      key: string
      level: 'item' | 'global'
    }>
  })
> = Factory.define<
  | Promotion<BuyXGetYEffect>
  | Required<BasketItem<Product, Variant, BuyXGetYEffect>>['promotion']
>(() => ({
  id: '77962bd0684cc1733576601d',
  effect: {
    type: PromotionEffectType.BUY_X_GET_Y,
    additionalData: {
      maxCount: 1,
      variantIds: [1, 2, 3],
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
    from: '2024-07-15T10:00:00Z' as RFC3339Date,
    to: '2025-04-01T10:00:00Z' as RFC3339Date,
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
    headlineParts: ['Free Gift Deal', 'Buy sneakers, and get a free cap'],
    product: {
      badgeLabel: 'Get a Cap',
      promotionId: 2477,
    },
    terms:
      "By buying one of the sneakers tagged with the badge 'Get a Cap', you can get a free cap. The promotion lasts till the end of March 2025.",
  },
}))

export const promotionWithCodeFactory: Factory<
  Promotion<AutomaticDiscountEffect>
> = Factory.define<Promotion<AutomaticDiscountEffect>>(() => ({
  id: '66951014684cc17335766007',
  name: 'Summer Sale',
  code: 'SUMMER2024',
  effect: {
    type: PromotionEffectType.AUTOMATIC_DISCOUNT,
    additionalData: {
      type: 'relative',
      value: 15,
    },
  },
  conditions: [
    {
      level: 'global',
      key: 'minimum_order_amount',
      condition: 'payload.totals.withTax >= 5000',
    },
  ],
  schedule: {
    from: '2024-06-01T00:00:00Z' as RFC3339Date,
    to: '2024-08-31T23:59:59Z' as RFC3339Date,
  },
  isActive: true,
  priority: 2,
  customData: {
    colorHex: '#ff6b6b',
    product: {
      badgeLabel: '15% Off',
      promotionId: 2478,
    },
    terms:
      'Use code SUMMER2024 to get 15% off your order when you spend €50 or more. Valid until August 31st, 2024.',
    category: {
      ctaLabel: 'Summer Deals',
      id: 50354,
    },
    corePanel: {
      viewType: 'automatic-discount',
    },
    headlineParts: [
      'Summer Sale',
      'Get 15% off with code SUMMER2024',
    ],
    minOrderValue: 5000,
  },
}))

type TieredPromotion =
  & Promotion<PromotionEffect>
  & Required<Pick<Promotion<PromotionEffect>, 'tiers'>>

export const tieredPromotionFactory: Factory<TieredPromotion> = Factory.define<
  TieredPromotion
>(() => ({
  id: '67f684824ceccb2700800351',
  name: 'Tiered Promotion for female jackets',
  schedule: {
    from: '2025-03-31T22:00:00Z',
    to: '2026-04-29T22:00:00Z',
  },
  isActive: true,
  effect: {
    type: 'automatic_discount',
    additionalData: {
      type: 'absolute',
      value: 0,
    },
  },
  conditions: [
    {
      level: 'item',
      key:
        'panels_tiered-discount_category_condition_c6dc9c125df05a50c041a61bbfd2f46d9a01586d',
      condition: 'item.product.categories.exists(c, c in [50355])',
    },
  ],
  priority: 2,
  tiers: [
    {
      id: 1,
      name: 'Tier 1',
      mov: 10000,
      effect: {
        additionalData: {
          type: 'relative',
          value: 10,
        },
      },
    },
    {
      id: 2,
      name: 'Tier 2',
      mov: 20000,
      effect: {
        additionalData: {
          type: 'relative',
          value: 15,
        },
      },
    },
    {
      id: 3,
      name: 'Tier 3',
      mov: 30000,
      effect: {
        additionalData: {
          type: 'relative',
          value: 18.01,
        },
      },
    },
  ],
  customData: {
    corePanel: {
      viewType: 'tiered-discount',
    },
    headline: 'Unlock Up to 20% Off!',
    link: '/c/c-50355',
    product: {
      attributeId: 2476,
      badgeLabel: 'Up to 20% Off!',
    },
    subline:
      'Save more when you buy more! Get 10% off €100+, 15% off €200+, or 20% off €300+.',
    color: {
      background: '#000000',
      text: '#ffffff',
    },
    conditions:
      "The promotion applies to products in the Women's Jackets category. Receive a 10% discount on orders over €100, 15% on orders over €200, and 20% on orders over €300. Offer valid until April 1st, 2026 (inclusive).",
  },
}))
