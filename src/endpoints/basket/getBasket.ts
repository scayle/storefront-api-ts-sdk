import {prefixList} from '../../helpers/attributes';
import {BapiCall} from '../../helpers/execute';
import {BasketResponse} from '../../types/Basket';
import {
  ProductWith,
  productWithQueryParameterValues,
  VariantWith,
  variantWithQueryParameterValues,
} from '../../types/ProductWith';

export interface BasketWith {
  items?: {
    product?: ProductWith;
    variant?: VariantWith;
  };
}

export function basketWithQueryParameter(basketWith: BasketWith): string[] {
  const withParams = [];

  if (basketWith.items && basketWith.items.product) {
    withParams.push(
      ...productWithQueryParameterValues(basketWith.items.product).map(
        value => `items.product.${value}`,
      ),
    );
  }

  if (basketWith.items && basketWith.items.variant) {
    withParams.push(
      ...prefixList(`items.variant.`)(
        variantWithQueryParameterValues(basketWith.items.variant),
      ),
    );
  }

  return withParams;
}

export interface GetBasketParameters {
  basketKey: string;

  with?: BasketWith;
  campaignKey?: string;

  skipAvailabilityCheck?: boolean;

  includeItemsWithoutProductData?: boolean;
}

export function getBasketEndpointRequest(
  params: GetBasketParameters,
): BapiCall<BasketResponse> {
  return {
    method: 'GET',
    endpoint: `/v1/baskets/${params.basketKey}`,
    params: {
      ...(params.with
        ? {with: basketWithQueryParameter(params.with).join(',')}
        : undefined),
      ...(params.campaignKey ? {campaignKey: params.campaignKey} : undefined),
      ...(params.skipAvailabilityCheck
        ? {skipAvailabilityCheck: params.skipAvailabilityCheck}
        : undefined),
      ...(params.includeItemsWithoutProductData
        ? {
            includeItemsWithoutProductData:
              params.includeItemsWithoutProductData,
          }
        : undefined),
    },
  };
}
