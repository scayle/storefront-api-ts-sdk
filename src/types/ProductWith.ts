import {
  AttributeInclude,
  attributeIncludeParameters,
  prefixList,
} from 'bapi/helpers/attributes';

export type ProductImageWith =
  | 'all'
  | {
      withKey?: string[];

      // AY specific, otherwise legacy is disabled by default
      legacy?: false;
    };

/**
 * 'all' is just first level
 */
export interface ProductWith {
  // TODO: Should these be arrays or also allow simple values, just `key` or `type`
  attributes?: AttributeInclude;
  advancedAttributes?: AttributeInclude;
  variants?:
    | 'all'
    | {
        attributes?: AttributeInclude;
        advancedAttributes?: AttributeInclude;
      };
  images?: ProductImageWith;
  siblings?: 'all' | ProductWith;
  categories?: 'all';
}

export function productWithQueryParameterValues(
  productWith: ProductWith
): string[] {
  const parameterValues: string[] = [];

  parameterValues.push(
    ...attributeIncludeParameters('attributes', productWith.attributes),
    ...attributeIncludeParameters(
      'advancedAttributes',
      productWith.advancedAttributes
    )
  );

  if (productWith.variants) {
    parameterValues.push('variants'); // always add, if any variants data requested

    if (typeof productWith.variants === 'object') {
      parameterValues.push(
        ...prefixList('variants.')(
          attributeIncludeParameters(
            'attributes',
            productWith.variants.attributes
          )
        ),
        ...prefixList('variants.')(
          attributeIncludeParameters(
            'advancedAttributes',
            productWith.variants.advancedAttributes
          )
        )
      );
    }
  }

  if (productWith.images) {
    if (productWith.images === 'all') {
      // nothing to do, included by default
    } else {
      const filters: string[] = [];

      if (productWith.images.legacy === false) {
        filters.push('legacy(false)');
      }

      if (productWith.images.withKey) {
        filters.push(`key(${productWith.images.withKey.join('|')})`);
      }

      if (filters.length > 0) {
        parameterValues.push(`images:${filters.join(':')}`);
      }
    }
  }

  if (productWith.categories) {
    parameterValues.push('categories');
  }

  if (productWith.siblings) {
    parameterValues.push('siblings'); // always add, if any sibling data requested

    if (typeof productWith.siblings === 'object') {
      parameterValues.push(
        ...productWithQueryParameterValues(productWith.siblings).map(
          queryParameter => `siblings.${queryParameter}`
        )
      );
    }
  }

  return parameterValues;
}
