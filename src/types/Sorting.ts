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
