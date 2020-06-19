import {BapiCall} from 'bapi/interfaces/BapiCall';
import {
  ProductWith,
  productWithQueryParameterValues,
} from 'bapi/types/ProductWith';
import {BapiProduct} from 'bapi/types/BapiProduct';
import {BapiCategory} from 'bapi/types/BapiCategory';
import {prefixList} from 'bapi/helpers/attributes';

export interface TypeaheadSuggestionsEndpointRequestParameters {
  term: string;

  campaignKey?: 'px' | undefined;

  with?: {
    // The `with` includes user for all returned products
    products?: ProductWith;
  };
}

export type TypeaheadSuggestionsEndpointResponseData = {
  topMatch?: TypeaheadSuggestion;

  suggestions: Array<TypeaheadSuggestion>;
};

export type TypeaheadSuggestion =
  | TypeaheadProductSuggestion
  | TypeaheadBrandOrCategorySuggestion;

export interface TypeaheadProductSuggestion {
  type: 'product';

  productSuggestion: ProductSuggestion;
}

export interface TypeaheadBrandOrCategorySuggestion {
  type: 'brandOrCategory';

  brandOrCategorySuggestion: BrandOrCategorySuggestion;
}

export interface ProductSuggestion {
  suggestion: string;

  product: BapiProduct;
}

export interface BrandOrCategorySuggestion {
  /**
   * The complete suggestion
   *
   * E.g.
   * Input: "Nike Sn"
   * Output: "<em>Nike</em> in <em>Sn</em>eakers in 40"
   */
  suggestion: string;

  /**
   * Which entity had the first (leftmost) token match.
   *
   * E.g. "Nike Sneaker" -> "brand", "Sneaker Nike" -> "category"
   */
  primaryMatch: 'brand' | 'category';

  /**
   * The category
   *
   * Either from the matched or suggested category,
   * or if none was applicable use the input category
   */
  category: BapiCategory;

  /**
   * Brand information if one was matched for the input
   */
  brand?: {
    id: number;
    name: string;
  };

  /**
   * Additional attribute filters to apply to the BAPI calls to get the matching products
   *
   * E.g. `categoryShopSize`,
   * and other attribute filters in the future (e.g. `color`)
   */
  attributeFilters: Array<{
    slug: string;
    // available for all non-fake attributes
    id?: number;
    name: string;
    values: Array<{
      id: number;
      name: string;
    }>;
  }>;

  /**
   * The total number of products matching the suggested filters
   */
  productCount: number;
}

export function createTypeaheadSuggestionsEndpointRequest(
  parameters: TypeaheadSuggestionsEndpointRequestParameters,
): BapiCall<TypeaheadSuggestionsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `typeahead`,
    params: {
      term: parameters.term,

      ...(parameters.campaignKey
        ? {campaignKey: parameters.campaignKey}
        : undefined),

      with: [
        ...(parameters.with?.products
          ? prefixList('product.')(
              productWithQueryParameterValues(parameters.with?.products),
            )
          : []),
      ].join(`,`),
    },
  };
}
