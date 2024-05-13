import type { StorefrontAPICall } from '../../helpers/execute'
import type { ArrayMinLength } from '../../types/ArrayMinLength'
import type { ProductSearchQuery } from '../../types/ProductSearchQuery'
import {
  queryParamsFromProductSearchQuery,
} from '../../types/ProductSearchQuery'
import type {
  AttributesFilterValue,
  BooleanFilterValue,
  IdentifierFilterValue,
  RangeFilterValue,
} from './filters'

export interface FilterValuesEndpointParameters {
  groupName: string

  where?: ProductSearchQuery

  campaignKey?: string

  orFiltersOperator?: ArrayMinLength<string, 2>
}

type FilterValuesResponseData =
  | BooleanFilterValue
  | RangeFilterValue
  | AttributesFilterValue[]
  | IdentifierFilterValue[]

export function createFilterValuesEndpointRequest(
  parameters: FilterValuesEndpointParameters,
): StorefrontAPICall<FilterValuesResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/filters/${parameters.groupName}/values`,
    params: {
      ...queryParamsFromProductSearchQuery(parameters.where),

      ...(parameters.campaignKey
        ? { campaignKey: parameters.campaignKey }
        : undefined),

      ...(parameters.orFiltersOperator &&
          parameters.orFiltersOperator.length > 1
        ? { orFiltersOperator: parameters.orFiltersOperator.join(',') }
        : undefined),
    },
  }
}
