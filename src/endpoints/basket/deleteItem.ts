import {
  BasketResponseData,
  BasketWith,
  basketWithQueryParameter,
} from 'bapi/endpoints/basket/getBasket';
import {BapiCall} from 'bapi/interfaces/BapiCall';

export interface DeleteItemParameters {
  basketKey: string;
  itemKey: string;

  with?: BasketWith;
}

export function deleteBasketItemRequest(
  params: DeleteItemParameters
): BapiCall<BasketResponseData> {
  return {
    method: 'DELETE',
    endpoint: `baskets/${params.basketKey}/items/${params.itemKey}`,
    params: {
      with: params.with
        ? basketWithQueryParameter(params.with).join(',')
        : undefined,
    },
  };
}
