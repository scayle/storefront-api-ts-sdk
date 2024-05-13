import type { ProductSearchQuery } from '../../types/ProductSearchQuery'
import {
  queryParamsFromProductSearchQuery,
} from '../../types/ProductSearchQuery'
import type { CentAmount } from '../../types/Product'
import type { ArrayMinLength } from '../../types/ArrayMinLength'
import type { StorefrontAPICall } from '../../helpers/execute'

export interface FiltersEndpointParameters {
  where?: ProductSearchQuery

  campaignKey?: string

  /**
   * `with` includes
   *
   * Defaults to `values`
   */
  with?: ('values' | 'category_ids')[]

  /**
   * Specifies which optional filters to include
   */
  including?: string[]

  includeSoldOut?: boolean

  includeSellableForFree?: boolean

  orFiltersOperator?: ArrayMinLength<string, 2>
}

export interface AttributesFilterValue {
  name: string
  id: number
  productCount: number
  value: string
}

export interface IdentifierFilterValue {
  id: number
  productCount: number
}

export type BooleanFilterValue =
  | []
  | [
    {
      name: true | false
      productCount: number
    },
  ]
  | [
    {
      name: true
      productCount: number
    },
    {
      name: false
      productCount: number
    },
  ]

export type RangeFilterValue =
  | [
    {
      min: CentAmount
      max: CentAmount
      productCount: number
    },
  ]
  | []

export enum FilterTypes {
  BOOLEAN = 'boolean',
  ATTRIBUTES = 'attributes',
  IDENTIFIER = 'identifier',
  RANGE = 'range',
}

export type FilterItemWithValues =
  | BooleanFilterItemWithValues
  | AttributesFilterItemWithValues
  | RangeFilterItemWithValues
  | IdenfitierFilterItemWithValues

export interface BooleanFilterItemWithValues {
  id: null
  slug: string
  name: string
  values: BooleanFilterValue
  type: FilterTypes.BOOLEAN
}

export interface AttributesFilterItemWithValues {
  id: number | null
  slug: string
  name: string
  values: AttributesFilterValue[]
  type: FilterTypes.ATTRIBUTES
  attributeGroupType: string
}

export interface RangeFilterItemWithValues {
  id: null
  slug: string
  name: string
  values: RangeFilterValue
  type: FilterTypes.RANGE
}

export interface IdenfitierFilterItemWithValues {
  slug: string
  name: string
  values: IdentifierFilterValue[]
  type: FilterTypes.IDENTIFIER
}

export type FiltersEndpointResponseData = FilterItemWithValues[]

export function createFiltersEndpointRequest(
  parameters: FiltersEndpointParameters,
): StorefrontAPICall<FiltersEndpointResponseData> {
  const withParam = parameters.with ? parameters.with.join(',') : 'values'

  return {
    method: 'GET',
    endpoint: '/v1/filters',
    params: {
      ...(withParam ? { with: withParam } : undefined),
      ...(parameters.including
        ? { including: parameters.including.join(',') }
        : undefined),
      ...(parameters.campaignKey
        ? { campaignKey: parameters.campaignKey }
        : undefined),
      ...(parameters.includeSoldOut
        ? { includeSoldOut: parameters.includeSoldOut }
        : undefined),
      ...(parameters.includeSellableForFree
        ? { includeSellableForFree: parameters.includeSellableForFree }
        : undefined),
      ...queryParamsFromProductSearchQuery(parameters.where),
      ...(parameters.orFiltersOperator &&
          parameters.orFiltersOperator.length > 1
        ? { orFiltersOperator: parameters.orFiltersOperator.join(',') }
        : undefined),
    },
  }
}
