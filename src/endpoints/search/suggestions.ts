import {BapiCall} from 'bapi/interfaces/BapiCall';
import {
  ProductWith,
  productWithQueryParameterValues,
} from 'bapi/types/ProductWith';
import {BapiProduct} from 'bapi/types/BapiProduct';
import {BapiCategory} from 'bapi/types/BapiCategory';

export interface SearchSuggestionsEndpointParameters {
  term: string;

  campaignKey?: 'px' | undefined;

  with?: {
    products?: ProductWith;
  };
}

export type SearchSuggestionsEndpointResponseData = {
  brands: Array<{
    id: number;
    label: string;
    value: string;
  }>;

  categories: Array<BapiCategory>;

  productNames: Array<{
    term: string;
  }>;

  products: Array<BapiProduct>;
};

function suggetionsWithQueryParameter(
  suggestionsWith: Exclude<
    SearchSuggestionsEndpointParameters['with'],
    undefined
  >,
): string[] {
  const withParams = [];

  if (suggestionsWith.products) {
    withParams.push(
      ...productWithQueryParameterValues(suggestionsWith.products).map(
        value => `products.${value}`,
      ),
    );
  }

  return withParams;
}

export function createSearchSuggestionsEndpointRequest(
  parameters: SearchSuggestionsEndpointParameters,
): BapiCall<SearchSuggestionsEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `search/suggestions`,
    params: {
      term: parameters.term,

      ...(parameters.campaignKey
        ? {campaignKey: parameters.campaignKey}
        : undefined),

      with: [
        'brands', // TODO: make these optional
        'categories',
        'productNames',
        'products',
        ...(parameters.with
          ? suggetionsWithQueryParameter(parameters.with)
          : []),
      ].join(`,`),
    },
  };
}
