export type AttributeKey = string & {readonly ___attributeKey: unique symbol};

export type AttributeFilter = AttributeKey;
export interface AttributeWithValuesFilter {
  type: 'attributes';
  key: AttributeKey;
  values: Array<string | number>;
}

export interface AttributeWithBooleanValueFilter {
  type: 'boolean';
  key: AttributeKey;
  value: boolean;
}

export type AttributeOrAttributeWithValuesFilter =
  | AttributeFilter
  | AttributeWithValuesFilter;
