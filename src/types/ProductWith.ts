import {
  AttributeInclude,
  attributeIncludeParameters,
  prefixList,
} from 'bapi/helpers/attributes';

export type ProductImageWith =
  | 'all'
  | {
      attributes?: {
        withKey?: string[];
      };
    };

/**
 * 'all' is just first level
 */
export interface ProductWith {
  // TODO: Should these be arrays or also allow simple values, just `key` or `type`
  attributes?: AttributeInclude;
  advancedAttributes?: AttributeInclude;
  variants?: 'all' | VariantWith;
  images?: ProductImageWith;
  siblings?: 'all' | ProductWith;
  categories?: 'all' | ProductCategoryWith;
  priceRange?: boolean;
}

export interface ProductCategoryWith {
  properties?: 'all';
}

export interface VariantWith {
  attributes?: AttributeInclude;
  advancedAttributes?: AttributeInclude;
  customData?: boolean;
}

export function productWithQueryParameterValues(
  productWith: ProductWith,
): string[] {
  const parameterValues: string[] = [];

  parameterValues.push(
    ...attributeIncludeParameters('attributes', productWith.attributes),
    ...attributeIncludeParameters(
      'advancedAttributes',
      productWith.advancedAttributes,
    ),
  );

  if (productWith.variants) {
    parameterValues.push('variants'); // always add, if any variants data requested

    if (typeof productWith.variants === 'object') {
      parameterValues.push(
        ...prefixList('variants.')(
          variantWithQueryParameterValues(productWith.variants),
        ),
      );
    }
  }

  if (!productWith.images || productWith.images === 'all') {
    // images and their attributes are included by default,
    // just request non-legacy attribute version
    parameterValues.push(`images.attributes:legacy(false)`);
  } else if (productWith.images.attributes) {
    const imagesAttributesFilters: string[] = [];

    imagesAttributesFilters.push('legacy(false)');

    if (productWith.images.attributes.withKey) {
      imagesAttributesFilters.push(
        `key(${productWith.images.attributes.withKey.join('|')})`,
      );
    }

    if (imagesAttributesFilters.length > 0) {
      parameterValues.push(
        `images.attributes:${imagesAttributesFilters.join(':')}`,
      );
    }
  }

  if (productWith.categories) {
    parameterValues.push('categories');

    if (typeof productWith.categories === 'object') {
      if (productWith.categories.properties) {
        parameterValues.push('categories.properties');
      }
    }
  }

  if (productWith.siblings) {
    parameterValues.push('siblings'); // always add, if any sibling data requested

    if (typeof productWith.siblings === 'object') {
      parameterValues.push(
        ...productWithQueryParameterValues(productWith.siblings).map(
          queryParameter => `siblings.${queryParameter}`,
        ),
      );
    }
  }

  if (productWith.priceRange === true) {
    parameterValues.push('priceRange');
  }

  return parameterValues;
}

export function variantWithQueryParameterValues(
  variantWith: VariantWith,
): string[] {
  return [
    ...attributeIncludeParameters('attributes', variantWith.attributes),
    ...attributeIncludeParameters(
      'advancedAttributes',
      variantWith.advancedAttributes,
    ),
    ...(variantWith.customData ? ['customData'] : []),
  ];
}
