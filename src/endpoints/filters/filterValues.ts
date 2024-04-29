import {BapiCall} from '../../interfaces/BapiCall';
import {ArrayMinLength} from '../../types/ArrayMinLength';
import {
  ProductSearchQuery,
  queryParamsFromProductSearchQuery,
} from '../../types/ProductSearchQuery';
import {
  BooleanFilterValue,
  RangeFilterValue,
  AttributesFilterValue,
  IdentifierFilterValue,
} from './filters';

export interface FilterValuesEndpointParameters {
  groupName: string;

  where?: ProductSearchQuery;

  campaignKey?: string;

  orFiltersOperator?: ArrayMinLength<string, 2>;
}

type FilterValuesResponseData =
  | BooleanFilterValue
  | RangeFilterValue
  | AttributesFilterValue[]
  | IdentifierFilterValue[];

export function createFilterValuesEndpointRequest(
  parameters: FilterValuesEndpointParameters,
): BapiCall<FilterValuesResponseData> {
  return {
    method: 'GET',
    endpoint: `filters/${parameters.groupName}/values`,
    params: {
      ...queryParamsFromProductSearchQuery(parameters.where),

      ...(parameters.campaignKey
        ? {campaignKey: parameters.campaignKey}
        : undefined),

      ...(parameters.orFiltersOperator &&
      parameters.orFiltersOperator.length > 1
        ? {orFiltersOperator: parameters.orFiltersOperator.join(',')}
        : undefined),
    },
  };
}
