import {
  AttributeWithBooleanValueFilter,
  AttributeWithValuesFilter,
} from '../types/AttributeOrAttributeValueFilter';
import {ObjectMap} from './ObjectMap';

export interface ProductSearchQuery {
  categoryId?: number;
  term?: string;
  minPrice?: number;
  maxPrice?: number;
  minReduction?: number;
  maxReduction?: number;
  attributes?: Array<
    AttributeWithValuesFilter | AttributeWithBooleanValueFilter
  >;
  containsSearch?: boolean;
  disableFuzziness?: boolean;
  hasCampaignReduction?: boolean;
}

export function queryParamsFromProductSearchQuery(
  productSearchQuery: ProductSearchQuery | undefined,
): ObjectMap<string | number> | undefined {
  if (!productSearchQuery) {
    return undefined;
  }

  const filters = {
    'filters[category]': productSearchQuery.categoryId,
    ...(productSearchQuery.attributes || []).reduce((acc, attribute) => {
      switch (attribute.type) {
        case 'attributes':
          acc[`filters[${attribute.key || attribute.id}]`] =
            attribute.values.join(`,`);
          break;

        case 'attributes:not':
          acc[`filters:not[${attribute.key}]`] = attribute.values.join(`,`);
          break;

        case 'boolean':
          acc[`filters[${attribute.key}]`] = attribute.value ? 'true' : 'false';
          break;

        /* istanbul ignore next */
        default:
          console.error(`Unsupported filter type`, attribute);
      }

      return acc;
    }, {} as ObjectMap<string>),
    'filters[term]': productSearchQuery.term,
    'filters[minPrice]': productSearchQuery.minPrice,
    'filters[maxPrice]': productSearchQuery.maxPrice,
    'filters[minReduction]': productSearchQuery.minReduction,
    'filters[maxReduction]': productSearchQuery.maxReduction,
    'filters[hasCampaignReduction]':
      productSearchQuery.hasCampaignReduction === undefined
        ? undefined
        : productSearchQuery.hasCampaignReduction.toString(),
    containsSearch: productSearchQuery.containsSearch ? 'true' : undefined,
    disableFuzziness: productSearchQuery.disableFuzziness ? 'true' : undefined,
  };

  const definedFilters: ObjectMap<string | number> = {};

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null) {
      definedFilters[key] = value;
    }
  }

  return definedFilters;
}
