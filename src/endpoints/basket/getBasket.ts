import {attributeIncludeParameters, prefixList} from 'bapi/helpers/attributes';
import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiPrice, BapiProduct, Variant} from 'bapi/types/BapiProduct';
import {
  ProductWith,
  productWithQueryParameterValues,
} from 'bapi/types/ProductWith';

type BasketItemPrice = BapiPrice;

export type BasketKey = string & {
  readonly ____tagBasketKey: unique symbol;
};

export interface BasketResponseData<P = BapiProduct, V = Variant> {
  key: BasketKey;
  cost: BasketItemPrice;
  currencyCode: 'EUR';
  items: BasketItem<P, V>[];

  packages: BasketPackageInformation[];
}

export interface BasketItem<P = BapiProduct, V = Variant> {
  key: string;
  packageId: number;
  price: {
    total: BasketItemPrice;
    unit: BasketItemPrice;
  };
  quantity: number;
  status: string;
  product: P;
  variant: V;
}

export interface BasketPackageInformation {
  id: number;
  carrierKey: string;
  deliveryDate: {
    // Date like '2018-02-05'
    max: string;
    // Date like '2018-02-02'
    min: string;
  };
}

export interface BasketWith {
  items?: {
    product?: ProductWith;
    variant?: Exclude<ProductWith['variants'], 'all'>;
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
        attributeIncludeParameters(
          'attributes',
          basketWith.items.variant.attributes,
        ),
      ),
      ...prefixList(`items.variant.`)(
        attributeIncludeParameters(
          'advancedAttributes',
          basketWith.items.variant.advancedAttributes,
        ),
      ),
    );
  }

  return withParams;
}

export interface GetBasketParameters {
  basketKey: string;

  with?: BasketWith;
}

export function getBasketEndpointRequest(
  params: GetBasketParameters,
): BapiCall<BasketResponseData> {
  return {
    method: 'GET',
    endpoint: `baskets/${params.basketKey}`,
    params: {
      with: params.with
        ? basketWithQueryParameter(params.with).join(',')
        : undefined,
    },
  };
}
