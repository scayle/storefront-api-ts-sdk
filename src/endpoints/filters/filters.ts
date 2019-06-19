import {BapiCall} from 'bapi/interfaces/BapiCall';
import {
  ProductSearchQuery,
  queryParamsFromProductSearchQuery,
} from 'bapi/types/ProductSearchQuery';
import {CentAmount} from 'bapi/types/BapiProduct';

export interface FiltersEndpointParameters {
  where: ProductSearchQuery;

  campaignKey?: string;

  /**
   * `with` includes
   *
   * Defaults to `values`
   */
  with?: ('values' | 'category_ids')[];
}

export interface AttributesFilterValue {
  name: string;
  id: number;
  productCount: number;
}

export interface IdentifierFilterValue {
  id: number;
  productCount: number;
}

export type BooleanFilterValue =
  | []
  | [
      {
        name: true | false;
        productCount: number;
      }
    ]
  | [
      {
        name: true;
        productCount: number;
      },
      {
        name: false;
        productCount: number;
      }
    ];

export type RangeFilterValue =
  | [
      {
        min: CentAmount;
        max: CentAmount;
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
  id: null;
  slug: string;
  name: string;
  values: BooleanFilterValue;
  type: FilterTypes.BOOLEAN;
}

export interface AttributesFilterItemWithValues {
  id: number | null;
  slug: string;
  name: string;
  values: AttributesFilterValue[];
  type: FilterTypes.ATTRIBUTES;
}

export interface RangeFilterItemWithValues {
  id: null;
  slug: string;
  name: string;
  values: RangeFilterValue;
  type: FilterTypes.RANGE;
}

export interface IdenfitierFilterItemWithValues {
  slug: string;
  name: string;
  values: IdentifierFilterValue[];
  type: FilterTypes.IDENTIFIER;
}

export type FiltersEndpointResponseData = FilterItemWithValues[];

export function createFiltersEndpointRequest(
  parameters: FiltersEndpointParameters,
): BapiCall<FiltersEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: 'filters',
    params: {
      with: parameters.with ? parameters.with.join(',') : 'values',
      ...queryParamsFromProductSearchQuery(parameters.where),
    },
  };
}
