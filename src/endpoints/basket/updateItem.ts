import {
  BasketResponseData,
  BasketWith,
  basketWithQueryParameter,
} from 'bapi/endpoints/basket/getBasket';
import {BapiCall} from 'bapi/interfaces/BapiCall';

export interface UpdateBasketItemQuantity {
  basketKey: string;
  itemKey: string;
  quantity: number;

  with?: BasketWith;
}

export function updateBasketItemQuantityRequest(
  params: UpdateBasketItemQuantity
): BapiCall<BasketResponseData> {
  return {
    method: 'PATCH',
    endpoint: `baskets/${params.basketKey}/items/${params.itemKey}`,
    params: {
      with: params.with
        ? basketWithQueryParameter(params.with).join(',')
        : undefined,
    },
    data: {
      quantity: params.quantity,
    },
  };
}
