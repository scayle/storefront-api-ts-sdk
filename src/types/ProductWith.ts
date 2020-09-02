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
  attributes?: AttributeInclude;
  advancedAttributes?: AttributeInclude;
  variants?: 'all' | VariantWith;
  images?: ProductImageWith;
  siblings?: 'all' | ProductWith;
  // If set product categories will be included
  // 'all' will return non-hidden categories, without any properties
  // Hidden ones can optional be requested as well
  // By default the categories will have no properties, but all or specific ones (by name) can be requested
  categories?: 'all' | ProductCategoryWith;
  priceRange?: boolean;
}

export interface ProductCategoryWith {
  properties?: ProductCategoryPropertyWith;
  includeHidden?: boolean;
}

export type ProductCategoryPropertyWith =
  | 'all'
  | {
      withName: string[];
    };

export interface VariantWith {
  attributes?: AttributeInclude;
  advancedAttributes?: AttributeInclude;
  stock?:
    | 'all'
    | {
        customData?: boolean;
      };
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

    if (productWith.variants && typeof productWith.variants === 'object') {
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
    if (typeof productWith.categories === 'object') {
      const categoryFlags: string[] = [];

      if (productWith.categories.includeHidden) {
        categoryFlags.push('hidden(true)');
      }

      if (productWith.categories.properties == 'all') {
        // do nothing, all properties are included by default for legacy reasons
      } else if (typeof productWith.categories.properties === 'object') {
        categoryFlags.push(
          `properties(${productWith.categories.properties.withName.join('|')})`,
        );
      } else {
        // don't include any properties by default
        categoryFlags.push(`properties()`);
      }

      if (categoryFlags.length > 0) {
        parameterValues.push(`categories:${categoryFlags.join(':')}`);
      } else {
        parameterValues.push('categories');
      }
    } else if (productWith.categories == 'all') {
      // include non-hidden categories, but without any properties
      parameterValues.push('categories:properties()');
    }
  }

  if (productWith.siblings) {
    parameterValues.push('siblings'); // always add, if any sibling data requested

    if (productWith.siblings && typeof productWith.siblings === 'object') {
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
    ...(variantWith.stock ? ['stock'] : []),
    ...(variantWith.stock &&
    typeof variantWith.stock === 'object' &&
    variantWith.stock.customData
      ? ['stock.customData']
      : []),
  ];
}
