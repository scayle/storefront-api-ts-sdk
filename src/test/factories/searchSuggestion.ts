import type {
  CategorySearchSuggestion,
  NavigationItemSuggestion,
  ProductSearchSuggestion,
} from '../../types/Search'
import { Factory } from 'fishery'
import {
  productFactory,
  navigationItemExternalFactory,
  categoryFactory,
} from '.'

export const categorySearchSuggestionFactory: Factory<
  CategorySearchSuggestion
> = Factory.define<
  CategorySearchSuggestion
>(() => ({
  type: 'category',
  categorySuggestion: {
    category: categoryFactory.build(),
    filters: [],
  },
}))
export const productSearchSuggestionFactory: Factory<ProductSearchSuggestion> =
  Factory.define<
    ProductSearchSuggestion
  >(() => ({
    type: 'product',
    productSuggestion: {
      product: productFactory.build(),
    },
  }))

export const navigationItemSuggestionFactory: Factory<
  NavigationItemSuggestion
> = Factory.define<
  NavigationItemSuggestion
>(() => ({
  type: 'navigationItem',
  navigationItemSuggestion: {
    navigationItem: navigationItemExternalFactory.build(),
  },
}))
