import {
  AttributeWithBooleanValueFilter,
  AttributeWithValuesFilter,
} from 'bapi/types/AttributeOrAttributeValueFilter';

export interface ProductSearchQuery {
  categoryId?: number;
  term?: string;
  minPrice?: number;
  maxPrice?: number;
  attributes?: Array<
    AttributeWithValuesFilter | AttributeWithBooleanValueFilter
  >;
}

export function queryParamsFromProductSearchQuery(
  productSearchQuery: ProductSearchQuery | undefined,
): Record<string, string | number | undefined> | undefined {
  if (!productSearchQuery) {
    return undefined;
  }

  const filters = {
    'filters[category]': productSearchQuery.categoryId,
    ...(productSearchQuery.attributes || []).reduce((acc, attribute) => {
      switch (attribute.type) {
        case 'attributes':
          acc[
            `filters[${attribute.key || attribute.id}]`
          ] = attribute.values.join(`,`);
          break;

        case 'boolean':
          acc[`filters[${attribute.key}]`] = attribute.value ? 'true' : 'false';
          break;

        /* istanbul ignore next */
        default:
          console.error(`Unsupported filter type`, attribute);
      }

      return acc;
    }, {} as Record<string, string | undefined>),
    'filters[term]': productSearchQuery.term,
    'filters[minPrice]': productSearchQuery.minPrice,
    'filters[maxPrice]': productSearchQuery.maxPrice,
  };

  const definedFilters: Record<string, string | number | undefined> = {};

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null) {
      definedFilters[key] = value;
    }
  }

  return definedFilters;
}
