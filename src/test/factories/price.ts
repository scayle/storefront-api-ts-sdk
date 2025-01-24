import type { CentAmount, VariantPrice as Price } from '../../types/Product'
import { Factory } from 'fishery'

export const priceFactory = Factory.define<Price>(() => ({
  currencyCode: 'USD',
  tax: { vat: { amount: 1 as CentAmount, rate: 0 } },
  withoutTax: 2 as CentAmount,
  withTax: 100 as CentAmount,
  appliedReductions: [],
}))
