import {BapiCall} from 'bapi/interfaces/BapiCall';
import {
  ProductSearchQuery,
  queryParamsFromProductSearchQuery,
} from 'bapi/types/ProductSearchQuery';

export interface FiltersEndpointParameters {
  where: ProductSearchQuery;

  campaignKey?: string;

  with?: string[];
}

export interface AttributeFilterValue {
  name: string;
  id: number;
  productCount: number;
}

export interface IdFilterValue {
  id: number;
  productCount: number;
}

export type BooleanFilterValue = [
  {
    name: true;
    productCount: number;
  },
  {
    name: false;
    productCount: number;
  }
];

export type MinMaxFilterValue =
  | [
      {
        min: number;
        max: number;
        productCount: number;
      }
    ]
  | [];

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
  | IdenfitierFilterItemWithValues;

export interface BooleanFilterItemWithValues {
  slug: string;
  name: string;
  values: BooleanFilterValue;
  type: FilterTypes.BOOLEAN;
}
export interface AttributesFilterItemWithValues {
  slug: string;
  name: string;
  values: AttributeFilterValue[];

  type: FilterTypes.ATTRIBUTES;
}

export interface RangeFilterItemWithValues {
  slug: string;
  name: string;
  values: MinMaxFilterValue;
  type: FilterTypes.RANGE;
}
export interface IdenfitierFilterItemWithValues {
  slug: string;
  name: string;
  values: IdFilterValue[];
  type: FilterTypes.IDENTIFIER;
}

export type FiltersEndpointResponseData = FilterItemWithValues[];

export function createFiltersEndpointRequest(
  parameters: FiltersEndpointParameters
): BapiCall<FiltersEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: 'filters',
    params: {
      with: 'values',
      ...queryParamsFromProductSearchQuery(parameters.where),
    },
  };
}
