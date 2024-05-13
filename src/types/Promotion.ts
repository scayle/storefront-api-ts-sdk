import type { RFC33339Date } from './Product'

export interface PromotionCustomData {
  [key: string]: unknown | undefined
}

export interface PromotionCondition {
  level: 'item' | 'global'
  key: string
  condition: string
}

export enum PromotionEffectType {
  AutomaticDiscount = 'automatic_discount',
  BuyXGetY = 'buy_x_get_y',
}

export interface AutomaticDiscountEffect {
  type: PromotionEffectType.AutomaticDiscount
  additionalData: {
    type: 'absolute' | 'relative'
    value: number
  }
}

export interface BuyXGetYEffect {
  type: PromotionEffectType.BuyXGetY
  additionalData: {
    maxCount: number
    variantIds: number[]
  }
}

export type PromotionEffect = AutomaticDiscountEffect | BuyXGetYEffect

export interface Promotion {
  id: string
  name: string
  schedule: {
    from: RFC33339Date
    to: RFC33339Date
  }
  isActive: boolean
  effect: PromotionEffect
  conditions: PromotionCondition[]
  customData: PromotionCustomData
  priority: number
}
