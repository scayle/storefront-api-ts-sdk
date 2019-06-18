export type AttributeKey = string & {readonly ___attributeKey: unique symbol};

export type AttributeFilter = AttributeKey;
export type AttributeWithValuesFilter =
  | {
      type: 'attributes';
      key: AttributeKey;
      id?: undefined;
      values: Array<string | number>;
    }
  | {
      type: 'attributes';
      id: number;
      key?: undefined;
      values: Array<string | number>;
    };

export interface AttributeWithBooleanValueFilter {
  type: 'boolean';
  key: AttributeKey;
  value: boolean;
}

export type AttributeOrAttributeWithValuesFilter =
  | AttributeFilter
  | AttributeWithValuesFilter;
