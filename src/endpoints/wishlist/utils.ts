import {
  productWithQueryParameterValues,
  variantWithQueryParameterValues,
} from '../../types/ProductWith'
import type { WishlistWith } from '../../types/Wishlist'

export function wishlistWithQueryParameter(
  wishlistWith: WishlistWith,
): string[] {
  const withParams = []

  if (wishlistWith.items && wishlistWith.items.product) {
    withParams.push(
      ...productWithQueryParameterValues(wishlistWith.items.product).map(
        value => `items.product.${value}`,
      ),
    )
  }

  if (wishlistWith.items && wishlistWith.items.variant) {
    withParams.push(
      ...variantWithQueryParameterValues(wishlistWith.items.variant).map(
        value => `items.variant.${value}`,
      ),
    )
  }

  return withParams
}
