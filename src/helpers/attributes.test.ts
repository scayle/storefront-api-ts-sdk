import { describe, it, expect } from 'vitest'
import { attributeIncludeParameters, prefixList } from './attributes'
import type { AttributeFilter, AttributeInclude } from './attributes'

describe('attributes', () => {
  // Test data factories
  const createKeyFilter = (keys: string[]): AttributeFilter => ({
    withKey: keys,
  })
  const createTypeFilter = (types: string[]): AttributeFilter => ({
    ofType: types,
  })
  const createCombinedFilter = (
    keys: string[],
    types: string[],
  ) => ({ withKey: keys, ofType: types } as AttributeFilter)

  // Shared test data
  const sampleSpecialKeys = ['color-size', 'brand_name', 'product.type']
  const sampleSpecialTypes = ['custom-type', 'nested.type', 'complex_type']

  describe('attributeIncludeParameters', () => {
    describe('edge cases and undefined handling', () => {
      it.each([
        ['undefined', undefined],
        ['null', null],
      ])(
        'should return empty array when attributeInclude is %s',
        (_, input: AttributeInclude | undefined) => {
          const result = attributeIncludeParameters('attributes', input)
          expect(result).toEqual([])
        },
      )

      it('should handle both attribute types correctly', () => {
        expect(attributeIncludeParameters('attributes', undefined)).toEqual([])
        expect(attributeIncludeParameters('advancedAttributes', undefined))
          .toEqual([])
      })
    })

    describe('all attributes inclusion', () => {
      it.each([
        ['attributes', 'attributes'],
        ['advancedAttributes', 'advancedAttributes'],
      ])(
        'should return %s parameter when attributeInclude is "all"',
        (type, expected) => {
          const result = attributeIncludeParameters(
            type as 'attributes' | 'advancedAttributes',
            'all',
          )
          expect(result).toEqual([expected])
        },
      )
    })

    describe('key-based filtering', () => {
      it.each([
        ['single key', ['color'], 'attributes:key(color)'],
        [
          'multiple keys',
          ['color', 'size', 'brand'],
          'attributes:key(color|size|brand)',
        ],
        ['empty array', [], 'attributes:key()'],
        [
          'special characters',
          sampleSpecialKeys,
          'attributes:key(color-size|brand_name|product.type)',
        ],
        ['numeric keys', ['1', '2', '3'], 'attributes:key(1|2|3)'],
      ])('should create key filter parameter for %s', (_, keys, expected) => {
        const result = attributeIncludeParameters(
          'attributes',
          createKeyFilter(keys),
        )
        expect(result).toEqual([expected])
      })

      it('should work with advancedAttributes type', () => {
        const result = attributeIncludeParameters(
          'advancedAttributes',
          createKeyFilter(['material', 'fabric']),
        )
        expect(result).toEqual(['advancedAttributes:key(material|fabric)'])
      })
    })

    describe('type-based filtering', () => {
      it.each([
        ['single type', ['string'], 'attributes:type(string)'],
        [
          'multiple types',
          ['string', 'number', 'boolean'],
          'attributes:type(string|number|boolean)',
        ],
        ['empty array', [], 'attributes:type()'],
        [
          'special characters',
          sampleSpecialTypes,
          'attributes:type(custom-type|nested.type|complex_type)',
        ],
      ])('should create type filter parameter for %s', (_, types, expected) => {
        const result = attributeIncludeParameters(
          'attributes',
          createTypeFilter(types),
        )
        expect(result).toEqual([expected])
      })

      it('should work with advancedAttributes type', () => {
        const result = attributeIncludeParameters(
          'advancedAttributes',
          createTypeFilter(['complex', 'nested']),
        )
        expect(result).toEqual(['advancedAttributes:type(complex|nested)'])
      })
    })

    describe('combined filtering', () => {
      it('should process both withKey and ofType when both are provided', () => {
        const result = attributeIncludeParameters(
          'attributes',
          createCombinedFilter(['color', 'size'], ['string', 'number']),
        )
        expect(result).toEqual([
          'attributes:key(color|size)',
          'attributes:type(string|number)',
        ])
      })

      it('should handle combined filtering with advancedAttributes', () => {
        const result = attributeIncludeParameters(
          'advancedAttributes',
          createCombinedFilter(['specifications'], ['complex']),
        )
        expect(result).toEqual([
          'advancedAttributes:key(specifications)',
          'advancedAttributes:type(complex)',
        ])
      })
    })

    describe('real-world scenarios', () => {
      it('should handle typical product attribute filtering', () => {
        const result = attributeIncludeParameters(
          'attributes',
          createKeyFilter(['color', 'size', 'brand']),
        )
        expect(result).toEqual(['attributes:key(color|size|brand)'])
      })

      it('should handle material type filtering', () => {
        const result = attributeIncludeParameters(
          'attributes',
          createTypeFilter(['fabric', 'leather', 'synthetic']),
        )
        expect(result).toEqual(['attributes:type(fabric|leather|synthetic)'])
      })

      it('should handle advanced attribute filtering', () => {
        const result = attributeIncludeParameters(
          'advancedAttributes',
          createKeyFilter(['specifications', 'dimensions']),
        )
        expect(result).toEqual([
          'advancedAttributes:key(specifications|dimensions)',
        ])
      })

      it('should handle mixed attribute include scenarios', () => {
        expect(attributeIncludeParameters('attributes', 'all')).toEqual([
          'attributes',
        ])
        expect(
          attributeIncludeParameters('attributes', createKeyFilter(['color'])),
        ).toEqual(['attributes:key(color)'])
        expect(
          attributeIncludeParameters(
            'attributes',
            createTypeFilter(['string']),
          ),
        ).toEqual(['attributes:type(string)'])
      })
    })
  })

  describe('prefixList', () => {
    // Test data factories
    const createPrefixTest = (
      prefix: string,
      input: string[],
      expected: string[],
    ) => ({
      prefix,
      input,
      expected,
    })

    const prefixTestCases = [
      createPrefixTest('attr_', ['color', 'size', 'brand'], [
        'attr_color',
        'attr_size',
        'attr_brand',
      ]),
      createPrefixTest('', ['a', 'b', 'c'], ['a', 'b', 'c']),
      createPrefixTest('@', ['user', 'admin', 'guest'], [
        '@user',
        '@admin',
        '@guest',
      ]),
      createPrefixTest('123_', ['item', 'product'], [
        '123_item',
        '123_product',
      ]),
      createPrefixTest('_', ['private', 'internal'], ['_private', '_internal']),
      createPrefixTest(
        'filter_',
        ['user-name', 'email@domain', 'phone_number'],
        ['filter_user-name', 'filter_email@domain', 'filter_phone_number'],
      ),
      createPrefixTest('id_', ['1', '2', '3'], ['id_1', 'id_2', 'id_3']),
      createPrefixTest('meta_', ['title', '123', 'description', '456'], [
        'meta_title',
        'meta_123',
        'meta_description',
        'meta_456',
      ]),
    ]

    describe('prefix variations', () => {
      it.each(prefixTestCases)(
        'should handle prefix "$prefix" correctly',
        ({ prefix, input, expected }) => {
          const prefixFn = prefixList(prefix)
          const result = prefixFn(input)
          expect(result).toEqual(expected)
        },
      )
    })

    describe('edge cases and special handling', () => {
      it('should handle empty list', () => {
        const prefixFn = prefixList('prefix_')
        const result = prefixFn([])
        expect(result).toEqual([])
      })

      it('should handle single item list', () => {
        const prefixFn = prefixList('item_')
        const result = prefixFn(['value'])
        expect(result).toEqual(['item_value'])
      })

      it('should work with different list lengths', () => {
        const prefixFn = prefixList('item_')
        expect(prefixFn(['a'])).toEqual(['item_a'])
        expect(prefixFn(['a', 'b'])).toEqual(['item_a', 'item_b'])
        expect(prefixFn(['a', 'b', 'c'])).toEqual([
          'item_a',
          'item_b',
          'item_c',
        ])
      })
    })

    describe('function composition and reuse', () => {
      it('should create reusable prefix functions', () => {
        const attrPrefix = prefixList('attr_')
        const metaPrefix = prefixList('meta_')

        const attributes = ['color', 'size']
        const metadata = ['title', 'description']

        expect(attrPrefix(attributes)).toEqual(['attr_color', 'attr_size'])
        expect(metaPrefix(metadata)).toEqual(['meta_title', 'meta_description'])
      })

      it('should handle multiple calls with same prefix function', () => {
        const prefixFn = prefixList('filter_')

        const result1 = prefixFn(['color', 'size'])
        const result2 = prefixFn(['brand', 'category'])

        expect(result1).toEqual(['filter_color', 'filter_size'])
        expect(result2).toEqual(['filter_brand', 'filter_category'])
      })
    })
  })

  describe('type safety and edge cases', () => {
    it('should maintain type safety for AttributeFilter', () => {
      const keyFilter: AttributeFilter = { withKey: ['color'] }
      const typeFilter: AttributeFilter = { ofType: ['string'] }

      expect(keyFilter.withKey).toEqual(['color'])
      expect(typeFilter.ofType).toEqual(['string'])
    })

    it('should handle AttributeInclude union type correctly', () => {
      const allInclude: AttributeInclude = 'all'
      const keyFilterInclude: AttributeInclude = { withKey: ['color'] }
      const typeFilterInclude: AttributeInclude = { ofType: ['string'] }

      expect(attributeIncludeParameters('attributes', allInclude)).toEqual([
        'attributes',
      ])
      expect(attributeIncludeParameters('attributes', keyFilterInclude))
        .toEqual(['attributes:key(color)'])
      expect(attributeIncludeParameters('attributes', typeFilterInclude))
        .toEqual(['attributes:type(string)'])
    })

    it('should handle edge case with empty strings in arrays', () => {
      const result = attributeIncludeParameters(
        'attributes',
        createKeyFilter(['', 'color', '']),
      )
      expect(result).toEqual(['attributes:key(|color|)'])
    })

    it('should handle very long key and type names', () => {
      const longKeyName = 'a'.repeat(100)
      const longTypeName = 'b'.repeat(100)

      expect(
        attributeIncludeParameters(
          'attributes',
          createKeyFilter([longKeyName]),
        ),
      ).toEqual([`attributes:key(${longKeyName})`])
      expect(
        attributeIncludeParameters(
          'attributes',
          createTypeFilter([longTypeName]),
        ),
      ).toEqual([`attributes:type(${longTypeName})`])
    })
  })

  describe('integration scenarios', () => {
    it('should handle complete attribute filtering workflow', () => {
      const scenarios = [
        { input: undefined, expected: [] },
        { input: 'all', expected: ['attributes'] },
        {
          input: createKeyFilter(['color', 'size']),
          expected: ['attributes:key(color|size)'],
        },
        {
          input: createTypeFilter(['string', 'number']),
          expected: ['attributes:type(string|number)'],
        },
      ]

      scenarios.forEach(({ input, expected }) => {
        const result = attributeIncludeParameters(
          'attributes',
          input as AttributeInclude | undefined,
        )
        expect(result).toEqual(expected)
      })
    })

    it('should work with prefixList in attribute filtering context', () => {
      const prefixFn = prefixList('filter_')
      const filterKeys = ['color', 'size', 'brand']
      const prefixedKeys = prefixFn(filterKeys)

      expect(prefixedKeys).toEqual([
        'filter_color',
        'filter_size',
        'filter_brand',
      ])

      const result = attributeIncludeParameters(
        'attributes',
        createKeyFilter(prefixedKeys),
      )
      expect(result).toEqual([
        'attributes:key(filter_color|filter_size|filter_brand)',
      ])
    })

    it('should handle complex nested attribute scenarios', () => {
      const baseAttributes = ['color', 'size', 'material']
      const advancedAttributes = [
        'specifications',
        'dimensions',
        'certifications',
      ]

      const baseFilter = createKeyFilter(baseAttributes)
      const advancedFilter = createTypeFilter(['complex', 'nested'])

      expect(attributeIncludeParameters('attributes', baseFilter)).toEqual([
        'attributes:key(color|size|material)',
      ])
      expect(attributeIncludeParameters('advancedAttributes', advancedFilter))
        .toEqual(['advancedAttributes:type(complex|nested)'])

      const basePrefix = prefixList('base_')
      const advancedPrefix = prefixList('adv_')

      expect(basePrefix(baseAttributes)).toEqual([
        'base_color',
        'base_size',
        'base_material',
      ])
      expect(advancedPrefix(advancedAttributes)).toEqual([
        'adv_specifications',
        'adv_dimensions',
        'adv_certifications',
      ])
    })
  })
})
