interface AttributeGroupBasic {
  id: number;
  key: string;
  label: string;
  type: string;
}

export interface AttributeGroupSingle extends AttributeGroupBasic {
  multiSelect: false;
  values: AttributeValue;
}

export interface AttributeGroupMulti extends AttributeGroupBasic {
  multiSelect: true;
  values: AttributeValue[];
}

export type AttributeGroup = AttributeGroupSingle | AttributeGroupMulti;

export type Attributes = Record<string, AttributeGroup | undefined>;

export interface AttributeValue {
  label: string;
  id: number;
  value: string;
}

export type AdvancedAttributes = Record<string, AdvancedAttribute | undefined>;

export type AdvancedAttribute = {
  id: number;
  key: string;
  label: string;
  type: string;
  values: GroupSet;
};

type FieldSet = Array<Array<{[key: string]: string | number | null | undefined}>>;

type GroupSet = Array<{
  fieldSet: FieldSet;
  groupSet: GroupSet;
}>;
