import type { ValuesType } from 'utility-types'

export const ProductStandardSorting = {
  PRICE: 'price',
  DATE_ADDED: 'new',
  REDUCTION: 'reduction',
} as const
// eslint-disable-next-line ts/no-redeclare -- intentionally naming the variable the same as the type
export type ProductStandardSorting = ValuesType<typeof ProductStandardSorting>

export const CampaignStandardSorting = {
  ID: 'id',
  REDUCTION: 'reduction',
  START_AT: 'start_at',
  END_AT: 'end_at',
} as const
// eslint-disable-next-line ts/no-redeclare -- intentionally naming the variable the same as the type
export type CampaignStandardSorting = ValuesType<typeof CampaignStandardSorting>

export const SortOrder = {
  ASCENDING: 'asc',
  DESCENDING: 'desc',
} as const
// eslint-disable-next-line ts/no-redeclare -- intentionally naming the variable the same as the type
export type SortOrder = ValuesType<typeof SortOrder>

export const SmartSortingKey = {
  /**
   * Promotes items with highest discounts and oldest inventory
   *
   * @see https://scayle.dev/en/core-documentation/the-basics/products/product-sorting?sourceText=Sales%2520Push#sales-push
   */
  SALES_PUSH: 'scayle:v1:sales-push',
  /**
   * Prioritizes recently added products with good availability
   *
   * @see https://scayle.dev/en/core-documentation/the-basics/products/product-sorting?sourceText=New%2520Arrivals%2520Push#new-arrivals-push
   */
  NEW_ARRIVALS: 'scayle:v1:new-arrivals',
  /**
   * Balances recency, availability, discounts, and sales data
   *
   * @see https://scayle.dev/en/core-documentation/the-basics/products/product-sorting?sourceText=Balanced%2520Value%2520Offerings#balanced-value-offerings
   */
  BALANCED_OFFERINGS: 'scayle:v1:balanced-offerings',
  /**
   * Optimizes inventory turnover for high stock products
   *
   * @see https://scayle.dev/en/core-documentation/the-basics/products/product-sorting?sourceText=Inventory%2520Optimization#inventory-optimization
   */
  INVENTORY_OPTIMIZATION: 'scayle:v1:inventory-optimization',
  /**
   * Highlights high-value luxury items with discounts
   *
   * @see https://scayle.dev/en/core-documentation/the-basics/products/product-sorting?sourceText=Luxury%2520Promotion#luxury-promotion
   */
  LUXURY_PROMOTION: 'scayle:v1:luxury-promotion',
  /**
   * Ensures broad variant availability across products
   *
   * @see https://scayle.dev/en/core-documentation/the-basics/products/product-sorting?sourceText=Comprehensive%2520Stock%2520Coverage#comprehensive-stock-coverage
   */
  STOCK_COVERAGE: 'scayle:v1:stock-coverage',
  /**
   * Prioritizes products with strong sales performance
   *
   * @see https://scayle.dev/en/core-documentation/the-basics/products/product-sorting?sourceText=Topseller#topseller
   */
  TOPSELLER: 'scayle:v1:topseller',
  /**
   * Maximizes revenue by prioritizing high revenue products
   *
   * @see https://scayle.dev/en/core-documentation/the-basics/products/product-sorting?sourceText=Revenue%2520Maximization#revenue-maximization
   */
  REVENUE_MAX: 'scayle:v1:revenue-max',
  /**
   * Favors products with high recent sales performance
   *
   * @see https://scayle.dev/en/core-documentation/the-basics/products/product-sorting?sourceText=Recently%2520Popular#recently-popular
   */
  RECENTLY_POPULAR: 'scayle:v1:recently-popular',
  /**
   * Favors products that are currently trending
   *
   * @see https://scayle.dev/en/core-documentation/the-basics/products/product-sorting?sourceText=Trending#trending
   */
  TRENDING: 'scayle:v1:trending',
} as const
// eslint-disable-next-line ts/no-redeclare -- intentionally naming the variable the same as the type
export type SmartSortingKey = ValuesType<typeof SmartSortingKey>
