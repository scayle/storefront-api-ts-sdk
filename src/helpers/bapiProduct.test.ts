import { describe, it, expect } from 'vitest'
import { getFirstAttributeValue, getAttributeValues } from './bapiProduct'
import type {
  Attributes,
  Value,
  AttributeGroupSingle,
  AttributeGroupMulti,
} from '../types/Product'

describe('bapiProduct', () => {
  // Test data factories
  const createSingleSelectAttribute = (
    key: string,
    value: Value,
    overrides?: Partial<AttributeGroupSingle>,
  ): AttributeGroupSingle => ({
    id: 1,
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    type: 'string',
    multiSelect: false,
    values: value,
    ...overrides,
  })

  const createMultiSelectAttribute = (
    key: string,
    values: Value[],
    overrides?: Partial<AttributeGroupMulti>,
  ): AttributeGroupMulti => ({
    id: 1,
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    type: 'string',
    multiSelect: true,
    values,
    ...overrides,
  })

  const createValue = (
    label: string,
    overrides: Partial<Value> = {},
  ): Value => ({
    label,
    id: 1,
    value: label.toLowerCase().replace(/\s+/g, '-'),
    ...overrides,
  })

  // Shared test data
  const sampleValues = {
    red: createValue('Red'),
    blue: createValue('Blue'),
    green: createValue('Green'),
    large: createValue('Large', { value: 'L' }),
    medium: createValue('Medium', { value: 'M' }),
    cotton: createValue('Cotton', { value: 'cotton' }),
    nike: createValue('Nike', { value: 'nike' }),
  }

  const sampleAttributes: Attributes = {
    color: createMultiSelectAttribute('color', [
      sampleValues.red,
      sampleValues.blue,
      sampleValues.green,
    ], { id: 1 }),
    size: createSingleSelectAttribute('size', sampleValues.large, { id: 2 }),
    material: createSingleSelectAttribute('material', sampleValues.cotton, {
      id: 3,
    }),
    brand: createSingleSelectAttribute('brand', sampleValues.nike, { id: 4 }),
  }

  describe('getFirstAttributeValue', () => {
    describe('edge cases and error handling', () => {
      it.each([
        ['undefined attributes', undefined, 'color'],
        ['empty attributes object', {}, 'color'],
        ['non-existent attribute', sampleAttributes, 'nonexistent'],
      ])('should return undefined for %s', (_, attributes, attributeName) => {
        const result = getFirstAttributeValue(
          attributes as Attributes | undefined,
          attributeName,
        )
        expect(result).toBeUndefined()
      })

      it.each([
        [
          'undefined values',
          createSingleSelectAttribute('color', undefined as Value | undefined),
        ],
        [
          'null values',
          createSingleSelectAttribute('color', null as Value | null),
        ],
        ['empty multi-select array', createMultiSelectAttribute('color', [])],
      ])('should return undefined when attribute has %s', (_, attribute) => {
        const attributes: Attributes = { color: attribute }
        const result = getFirstAttributeValue(attributes, 'color')
        expect(result).toBeUndefined()
      })
    })

    describe('single-select attributes', () => {
      it('should return the value directly', () => {
        const result = getFirstAttributeValue(sampleAttributes, 'size')
        expect(result).toBe(sampleValues.large)
      })

      it('should handle minimal value structure', () => {
        const minimalAttribute = createSingleSelectAttribute('brand', {
          label: 'Nike',
        })
        const attributes: Attributes = { brand: minimalAttribute }

        const result = getFirstAttributeValue(attributes, 'brand')
        expect(result).toEqual({ label: 'Nike' })
      })

      it('should handle complex value structure', () => {
        const complexAttribute = createSingleSelectAttribute(
          'material',
          sampleValues.cotton,
        )
        const attributes: Attributes = { material: complexAttribute }

        const result = getFirstAttributeValue(attributes, 'material')
        expect(result).toEqual(sampleValues.cotton)
      })
    })

    describe('multi-select attributes', () => {
      it('should return first value from array', () => {
        const result = getFirstAttributeValue(sampleAttributes, 'color')
        expect(result).toBe(sampleValues.red)
      })

      it('should handle single value in multi-select array', () => {
        const singleValueAttribute = createMultiSelectAttribute('tags', [
          sampleValues.red,
        ])
        const attributes: Attributes = { tags: singleValueAttribute }

        const result = getFirstAttributeValue(attributes, 'tags')
        expect(result).toBe(sampleValues.red)
      })
    })

    describe('multiple attributes scenario', () => {
      it('should return correct values for different attribute types', () => {
        const multiAttributeSet: Attributes = {
          size: createSingleSelectAttribute('size', sampleValues.large),
          color: createMultiSelectAttribute('color', [
            sampleValues.red,
            sampleValues.blue,
          ]),
          brand: createSingleSelectAttribute('brand', sampleValues.nike),
        }

        expect(getFirstAttributeValue(multiAttributeSet, 'size')).toBe(
          sampleValues.large,
        )
        expect(getFirstAttributeValue(multiAttributeSet, 'color')).toBe(
          sampleValues.red,
        )
        expect(getFirstAttributeValue(multiAttributeSet, 'brand')).toBe(
          sampleValues.nike,
        )
      })
    })
  })

  describe('getAttributeValues', () => {
    describe('edge cases and error handling', () => {
      it.each([
        ['undefined attributes', undefined, 'color'],
        ['empty attributes object', {}, 'color'],
        ['non-existent attribute', sampleAttributes, 'nonexistent'],
      ])('should return empty array for %s', (_, attributes, attributeName) => {
        const result = getAttributeValues(
          attributes as Attributes | undefined,
          attributeName,
        )
        expect(result).toEqual([])
      })

      it.each([
        [
          'undefined values',
          createSingleSelectAttribute('color', undefined as Value | undefined),
        ],
        [
          'null values',
          createSingleSelectAttribute('color', null as Value | null),
        ],
      ])('should return empty array when attribute has %s', (_, attribute) => {
        const attributes: Attributes = { color: attribute }
        const result = getAttributeValues(attributes, 'color')
        expect(result).toEqual([])
      })
    })

    describe('single-select attributes', () => {
      it('should wrap single value in array', () => {
        const result = getAttributeValues(sampleAttributes, 'size')
        expect(result).toEqual([sampleValues.large])
      })

      it('should handle minimal value structure', () => {
        const minimalAttribute = createSingleSelectAttribute('brand', {
          label: 'Nike',
        })
        const attributes: Attributes = { brand: minimalAttribute }

        const result = getAttributeValues(attributes, 'brand')
        expect(result).toEqual([{ label: 'Nike' }])
      })

      it('should handle empty string values', () => {
        const emptyValueAttribute = createSingleSelectAttribute('description', {
          label: '',
          id: 1,
          value: '',
        })
        const attributes: Attributes = { description: emptyValueAttribute }

        const result = getAttributeValues(attributes, 'description')
        expect(result).toEqual([{ label: '', id: 1, value: '' }])
      })
    })

    describe('multi-select attributes', () => {
      it('should return array directly', () => {
        const result = getAttributeValues(sampleAttributes, 'color')
        expect(result).toEqual([
          sampleValues.red,
          sampleValues.blue,
          sampleValues.green,
        ])
      })

      it('should handle empty array', () => {
        const emptyArrayAttribute = createMultiSelectAttribute('tags', [])
        const attributes: Attributes = { tags: emptyArrayAttribute }

        const result = getAttributeValues(attributes, 'tags')
        expect(result).toEqual([])
      })

      it('should handle single value in multi-select array', () => {
        const singleValueAttribute = createMultiSelectAttribute('tags', [
          sampleValues.red,
        ])
        const attributes: Attributes = { tags: singleValueAttribute }

        const result = getAttributeValues(attributes, 'tags')
        expect(result).toEqual([sampleValues.red])
      })

      it('should preserve null/undefined values in arrays', () => {
        const mixedValuesAttribute = createMultiSelectAttribute('extras', [
          sampleValues.red,
          { label: null as string | null, id: 2, value: null as string | null },
          { label: 'Card', id: 3, value: undefined as string | undefined },
        ])
        const attributes: Attributes = { extras: mixedValuesAttribute }

        const result = getAttributeValues(attributes, 'extras')
        expect(result).toEqual([
          sampleValues.red,
          { label: null, id: 2, value: null },
          { label: 'Card', id: 3, value: undefined },
        ])
      })
    })

    describe('key handling', () => {
      it('should handle numeric keys', () => {
        const numericKeyAttributes: Attributes = {
          '1': createSingleSelectAttribute('1', sampleValues.red),
          2: createMultiSelectAttribute('2', [
            sampleValues.blue,
            sampleValues.green,
          ]),
        }

        expect(getAttributeValues(numericKeyAttributes, '1')).toEqual([
          sampleValues.red,
        ])
        expect(getAttributeValues(numericKeyAttributes, '2')).toEqual([
          sampleValues.blue,
          sampleValues.green,
        ])
      })

      it('should handle special characters in keys', () => {
        const specialKeyAttribute = createSingleSelectAttribute(
          'color-size',
          sampleValues.red,
        )
        const attributes: Attributes = { 'color-size': specialKeyAttribute }

        const result = getAttributeValues(attributes, 'color-size')
        expect(result).toEqual([sampleValues.red])
      })
    })

    describe('multiple attributes scenario', () => {
      it('should return correct arrays for different attribute types', () => {
        const multiAttributeSet: Attributes = {
          size: createSingleSelectAttribute('size', sampleValues.large),
          color: createMultiSelectAttribute('color', [
            sampleValues.red,
            sampleValues.blue,
          ]),
          brand: createSingleSelectAttribute('brand', sampleValues.nike),
        }

        expect(getAttributeValues(multiAttributeSet, 'size')).toEqual([
          sampleValues.large,
        ])
        expect(getAttributeValues(multiAttributeSet, 'color')).toEqual([
          sampleValues.red,
          sampleValues.blue,
        ])
        expect(getAttributeValues(multiAttributeSet, 'brand')).toEqual([
          sampleValues.nike,
        ])
      })
    })
  })

  describe('real-world scenarios', () => {
    it('should handle complete product attribute workflow', () => {
      const productAttributes: Attributes = {
        color: createMultiSelectAttribute('color', [
          sampleValues.red,
          sampleValues.blue,
        ]),
        size: createSingleSelectAttribute('size', sampleValues.medium),
        material: createSingleSelectAttribute('material', sampleValues.cotton),
        tags: createMultiSelectAttribute('tags', [
          createValue('New Arrival', { id: 4, value: 'new-arrival' }),
          createValue('Limited Edition', { id: 5, value: 'limited-edition' }),
        ]),
      }

      // Test getFirstAttributeValue for all attributes
      expect(getFirstAttributeValue(productAttributes, 'color')).toEqual(
        sampleValues.red,
      )
      expect(getFirstAttributeValue(productAttributes, 'size')).toEqual(
        sampleValues.medium,
      )
      expect(getFirstAttributeValue(productAttributes, 'material')).toEqual(
        sampleValues.cotton,
      )
      expect(getFirstAttributeValue(productAttributes, 'tags')).toEqual(
        createValue('New Arrival', { id: 4, value: 'new-arrival' }),
      )

      // Test getAttributeValuesByAttributeName for all attributes
      expect(getAttributeValues(productAttributes, 'color')).toEqual([
        sampleValues.red,
        sampleValues.blue,
      ])
      expect(getAttributeValues(productAttributes, 'size')).toEqual([
        sampleValues.medium,
      ])
      expect(getAttributeValues(productAttributes, 'material')).toEqual([
        sampleValues.cotton,
      ])
      expect(getAttributeValues(productAttributes, 'tags')).toEqual([
        createValue('New Arrival', { id: 4, value: 'new-arrival' }),
        createValue('Limited Edition', { id: 5, value: 'limited-edition' }),
      ])
    })

    it('should handle missing attributes gracefully in real scenarios', () => {
      const partialProductAttributes: Attributes = {
        size: createSingleSelectAttribute('size', sampleValues.large),
      }

      // Test non-existent attributes return appropriate defaults
      expect(getFirstAttributeValue(partialProductAttributes, 'color'))
        .toBeUndefined()
      expect(getFirstAttributeValue(partialProductAttributes, 'brand'))
        .toBeUndefined()
      expect(getAttributeValues(partialProductAttributes, 'color'))
        .toEqual([])
      expect(getAttributeValues(partialProductAttributes, 'brand'))
        .toEqual([])

      // Test existing attributes work correctly
      expect(getFirstAttributeValue(partialProductAttributes, 'size')).toEqual(
        sampleValues.large,
      )
      expect(getAttributeValues(partialProductAttributes, 'size'))
        .toEqual([
          sampleValues.large,
        ])
    })

    it('should handle edge cases in production data', () => {
      const edgeCaseAttributes: Attributes = {
        // Attribute with null id and type
        brand: createSingleSelectAttribute('brand', { label: 'Generic Brand' }),
        // Attribute with empty values array
        tags: createMultiSelectAttribute('tags', []),
        // Attribute with single value in multi-select
        categories: createMultiSelectAttribute('categories', [
          createValue('Electronics'),
        ]),
      }

      // Test edge cases
      expect(getFirstAttributeValue(edgeCaseAttributes, 'brand')).toEqual({
        label: 'Generic Brand',
      })
      expect(getFirstAttributeValue(edgeCaseAttributes, 'tags')).toBeUndefined()
      expect(getFirstAttributeValue(edgeCaseAttributes, 'categories')).toEqual(
        createValue('Electronics'),
      )

      expect(getAttributeValues(edgeCaseAttributes, 'brand')).toEqual([{
        label: 'Generic Brand',
      }])
      expect(getAttributeValues(edgeCaseAttributes, 'tags')).toEqual([])
      expect(getAttributeValues(edgeCaseAttributes, 'categories'))
        .toEqual([
          createValue('Electronics'),
        ])
    })
  })
})
