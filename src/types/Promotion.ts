import type { ValuesType } from 'utility-types'
import type { RFC33339Date } from './Product'

export interface PromotionCustomData {
  [key: string]: unknown | undefined
}

export interface PromotionCondition {
  level: 'item' | 'global'
  key: string
  condition: string
}

export const PromotionEffectType = {
  AUTOMATIC_DISCOUNT: 'automatic_discount',
  BUY_X_GET_Y: 'buy_x_get_y',
} as const
// eslint-disable-next-line ts/no-redeclare -- intentionally naming the variable the same as the type
export type PromotionEffectType = ValuesType<typeof PromotionEffectType>

export interface AutomaticDiscountEffect {
  type: typeof PromotionEffectType.AUTOMATIC_DISCOUNT
  additionalData: {
    type: 'absolute' | 'relative'
    value: number
  }
}

export interface BuyXGetYEffect {
  type: typeof PromotionEffectType.BUY_X_GET_Y
  additionalData: {
    maxCount: number
    variantIds: number[]
  }
}

export type PromotionEffect = AutomaticDiscountEffect | BuyXGetYEffect

export interface Promotion<Effect = PromotionEffect> {
  id: string
  name: string
  schedule: {
    from: RFC33339Date
    to: RFC33339Date
  }
  isActive: boolean
  effect: Effect
  conditions: PromotionCondition[]
  customData: PromotionCustomData
  priority: number
}
