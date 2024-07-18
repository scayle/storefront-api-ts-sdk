import type { Product, Variant } from './Product'
import type { ProductWith, VariantWith } from './ProductWith'

export interface Wishlist {
  key: string
  items: WishlistItem[]
}

export interface WishlistItemCustomData {}

export interface WishlistItemGroup {
  id: string
  isMainItem: boolean
  isRequired: boolean
}

export interface WishlistItem {
  key: string

  product: Product
  productId: number

  variant?: Variant
  variantId: number | null

  customData: WishlistItemCustomData

  itemGroup?: WishlistItemGroup
}

export interface WishlistWith {
  items?: {
    product?: ProductWith
    variant?: VariantWith
  }
}
