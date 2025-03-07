import type { Variant, RFC33339Date } from '../../types/Product'
import { Factory } from 'fishery'
import { priceFactory } from './price'

export const variantFactory: Factory<Variant> = Factory.define<Variant>(() => ({
  id: 1,
  lowestPriorPrice: {
    withTax: 23,
    relativeDifferenceToPrice: null,
  },
  stock: { warehouseId: 1, quantity: 2 },
  createdAt: '' as RFC33339Date,
  updatedAt: '' as RFC33339Date,
  price: priceFactory.build(),
}))
