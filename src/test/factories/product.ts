import type { Attributes, Product } from '../../types/Product'
import { Factory } from 'fishery'
import { attributeGroupFactory } from './attribute'
import { variantFactory } from './variant'

export const productFactory = Factory.define<Product>((options) => {
  const attributes = {
    name: attributeGroupFactory.build({
      key: 'name',
      label: 'Test Product',
      values: {
        label: 'Test Product',
      },
    }),
    brand: attributeGroupFactory.build({
      key: 'brand',
      label: 'Brand',
      type: 'string',
      values: {
        label: 'Brand Name',
        id: 101,
        value: 'brand-name',
      },
    }),
    color: attributeGroupFactory.build({
      key: 'color',
      label: 'Color',
      type: '',
      values: {
        id: 6,
        label: 'Weiß',
        value: 'weiss',
      },
    }),
  }

  return {
    id: 1,
    attributes: (options.params.attributes as Attributes) ?? attributes,
    isActive: true,
    isSoldOut: false,
    isNew: false,
    createdAt: '',
    updatedAt: '',
    images: [{ hash: 'test image' }],
    siblings: [
      {
        id: 5,
        attributes: (options.params.attributes as Attributes) ?? attributes,
        isActive: true,
        isSoldOut: false,
        isNew: false,
        createdAt: '',
        updatedAt: '',
        images: [],
      },
    ],
    variants: [
      variantFactory.build({ id: 1 }),
      variantFactory.build({ id: 2 }),
    ],
  }
})
