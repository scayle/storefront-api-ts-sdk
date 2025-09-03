import type { ValuesType } from 'utility-types'
import type { CentAmount, RFC33339Date } from './Product'

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
  COMBO_DEAL: 'combo_deal',
} as const

// eslint-disable-next-line ts/no-redeclare -- intentionally naming the variable the same as the type
export type PromotionEffectType = ValuesType<typeof PromotionEffectType>

export interface AutomaticDiscountEffect {
  type: typeof PromotionEffectType.AUTOMATIC_DISCOUNT
  additionalData: {
    /** The discount type to apply, which can be either a specific amount (e.g. 10€) or a percentage (e.g. 10%). */
    type: 'absolute' | 'relative'
    /** The discount amount, expressed as a percentage or as a value in cents. */
    value: number
  }
}

export interface BuyXGetYEffect {
  type: typeof PromotionEffectType.BUY_X_GET_Y
  additionalData: {
    /** The quantity of items that need to be considered for the count logic. */
    eligibleItemsQuantity: number
    /** The type of discount to apply, which can be either a specific amount (e.g. 10€) or a percentage (e.g. 10%). */
    discountType: 'absolute' | 'relative'
    /** The discount amount, expressed as cents or as a percentage. */
    discountValue: number
    /** The distribution method for the discount. */
    discountDistribution: 'none' | 'pro_rata'
    /** The method for identifying which items qualify for the discount. */
    applicableItemSelectionType: 'variant_ids' | 'cheapest' | 'random'
    /** The maximum number of items the customer can redeem. */
    maxCount: number
    /** How often the promotion can be used per order. */
    maxCountType:
      | 'per_eligible_items_quantity'
      | 'per_item_set'
      | 'single_item'
      | 'per_eligible_uniq_items'
    /** An optional list of variant IDs that can be redeemed when promotional requirements are fulfilled. */
    variantIds: number[]
  }
}

export interface ComboDealEffect {
  type: typeof PromotionEffectType.COMBO_DEAL
  additionalData: {
    /** The final price that will be applied to the eligible items in the basket. */
    price: number
    /** The quantity of items that need to be considered for the count logic. */
    eligibleItemsQuantity: number
    /** The frequency with which the promotion can be applied within a single order. */
    maxCountType: 'per_eligible_items_quantity' | 'per_item_set' | 'single_item'
  }
}

export type PromotionEffect =
  | AutomaticDiscountEffect
  | BuyXGetYEffect
  | ComboDealEffect

export interface PromotionTier {
  effect: Omit<AutomaticDiscountEffect, 'type'> | PromotionEffect
  id: number
  name: string
  mov: CentAmount
}

export interface Promotion<Effect = PromotionEffect> {
  id: string
  code?: string
  tiers?: PromotionTier[]
  name: string
  displayName?: string | null
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
