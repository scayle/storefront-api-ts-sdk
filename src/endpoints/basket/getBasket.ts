import {prefixList} from 'bapi/helpers/attributes';
import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiPrice, BapiProduct, Variant} from 'bapi/types/BapiProduct';
import {
  ProductWith,
  productWithQueryParameterValues,
  VariantWith,
  variantWithQueryParameterValues,
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
  customData: unknown;
  packageId: number;
  price: {
    total: BasketItemPrice;
    unit: BasketItemPrice;
  };
  quantity: number;
  status: string;
  product: P;
  variant: V;
  displayData: BasketItemDisplayData;
}

export interface BaskteItemDisplayDataItem {
  value: string;
  label: string;
  key: string;
}

export type BasketItemDisplayDataKey =
  | 'meta'
  | 'name'
  | 'identifier'
  | 'attribute-1'
  | 'attribute-2'
  | 'attribute-3';

export type BasketItemDisplayData = Partial<
  Record<BasketItemDisplayDataKey, BaskteItemDisplayDataItem>
>;

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
  campaignKey?: 'px' | undefined;
}

export function getBasketEndpointRequest(
  params: GetBasketParameters,
): BapiCall<BasketResponseData> {
  return {
    method: 'GET',
    endpoint: `baskets/${params.basketKey}`,
    params: {
      ...(params.with
        ? {with: basketWithQueryParameter(params.with).join(',')}
        : undefined),
      ...(params.campaignKey ? {campaignKey: params.campaignKey} : undefined),
    },
  };
}
