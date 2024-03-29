import {BapiCall} from '../../interfaces/BapiCall';
import {
  ProductWith,
  productWithQueryParameterValues,
} from '../../types/ProductWith';
import {BapiProduct} from '../../types/BapiProduct';
import {BapiCategory} from '../../types/BapiCategory';
import {prefixList} from '../../helpers/attributes';

export interface TypeaheadSuggestionsEndpointRequestParameters {
  term: string;

  // Not enabled on BAPI side yet
  // campaignKey?: string;

  with?: {
    // The `with` includes used for all returned products
    products?: ProductWith;
    // The `with` includes used for all returned categories
    categories?: {
      parents?: 'all';

      // How many levels of children to load
      //
      // 0 means no children, 1 means 1 level of children, etc.
      children?: number;
    };
  };

  // Category ID under which to search
  categoryId?: number;

  // Maximum number of products to be returned
  productLimit?: number;
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
  score: number; // NOTE: Only comparable amongst product suggestions
  productSuggestion: ProductSuggestion;
}

export interface TypeaheadBrandOrCategorySuggestion {
  type: 'brandOrCategory';
  score: number; // NOTE: Only comparable amongst brandOrCategory suggestions
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
    values: number[];
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
    method: 'POST',
    endpoint: `typeahead`,
    params: {
      term: parameters.term,

      // ...(parameters.campaignKey
      //   ? {campaignKey: parameters.campaignKey}
      //   : undefined),

      with: [
        ...(parameters.with?.products
          ? prefixList('product.')(
              productWithQueryParameterValues(parameters.with?.products),
            )
          : []),
        ...(parameters.with?.categories?.parents == 'all'
          ? ['category.parents']
          : []),

        ...(parameters.with?.categories?.children ? ['category.children'] : []),
      ].join(`,`),

      ...(parameters.with?.categories?.children
        ? {categoryDepth: parameters.with?.categories?.children + 1}
        : undefined),
    },
    data: {
      ...(parameters.categoryId
        ? {categoryId: parameters.categoryId}
        : undefined),
      ...(parameters.productLimit != null
        ? {limit: parameters.productLimit}
        : undefined),
    },
  };
}
