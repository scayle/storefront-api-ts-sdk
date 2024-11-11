import type { AttributeGroup, AdvancedAttribute } from '../../types/Product'
import { Factory } from 'fishery'

export const attributeGroupFactory = Factory.define<AttributeGroup>(() => {
  return {
    id: 1,
    key: 'name',
    label: 'Test Attribute',
    type: null,
    multiSelect: false,
    values: {
      label: 'Test Attribute',
    },
  }
})

export const advancedAttributeFactory = Factory.define<AdvancedAttribute>(
  () => ({
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
  }),
)
