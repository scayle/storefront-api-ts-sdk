import {BapiCall} from 'bapi/interfaces/BapiCall';
import {
  ProductSearchQuery,
  queryParamsFromProductSearchQuery,
} from 'bapi/types/ProductSearchQuery';
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
    },
  };
}
