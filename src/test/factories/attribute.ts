import type {
  AttributeGroup,
  AdvancedAttribute,
  AttributeGroupMulti,
  AttributeGroupSingle,
} from '../../types/Product'
import { Factory } from 'fishery'

/**
 * @deprecated - will be removed in the next major version in favor of using `AttributeGroupMulti` or `AttributeGroupSingle` directly.
 */
export const attributeGroupFactory: Factory<AttributeGroup> = Factory.define<
  AttributeGroup
>(() => ({
  id: 1,
  key: 'name',
  label: 'Test Attribute',
  type: null,
  multiSelect: false,
  values: {
    label: 'Test Attribute',
  },
}))

export const attributeGroupSingleFactory: Factory<AttributeGroupSingle> =
  Factory.define<AttributeGroupSingle>(() => ({
    id: 1,
    key: 'name',
    label: 'Test Attribute',
    type: null,
    multiSelect: false,
    values: {
      label: 'Test Attribute',
    },
  }))

export const attributeGroupMultiFactory: Factory<AttributeGroupMulti> = Factory
  .define<AttributeGroupMulti>(() => ({
    id: 1,
    key: 'name',
    label: 'Test Attribute',
    type: null,
    multiSelect: true,
    values: [
      {
        label: 'Test Attribute',
      },
    ],
  }))

export const advancedAttributeFactory: Factory<AdvancedAttribute> = Factory
  .define<AdvancedAttribute>(() => ({
    id: 553,
    key: 'productName',
    label: 'Produktname',
    type: '',
    values: [
      {
        fieldSet: [[{ value: "Jacke 'Premium Essentials'" }]],
        groupSet: [],
      },
    ],
  }))
