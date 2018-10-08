import {
  BasketResponseData,
  BasketWith,
  basketWithQueryParameter,
} from 'bapi/endpoints/basket/getBasket';
import {BapiCall} from 'bapi/interfaces/BapiCall';

export interface CreateBasketItemParameters {
  basketKey: string;
  variantId: number;
  quantity: number;
  with?: BasketWith;
}

export function createBasketItemRequest(
  params: CreateBasketItemParameters
): BapiCall<BasketResponseData> {
  return {
    method: 'POST',
    endpoint: `baskets/${params.basketKey}/items`,
    params: {
      with: params.with
        ? basketWithQueryParameter(params.with).join(',')
        : undefined,
    },
    data: {
      variantId: params.variantId,
      quantity: params.quantity,
    },
  };
}
