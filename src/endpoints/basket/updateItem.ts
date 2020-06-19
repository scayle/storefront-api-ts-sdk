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
  campaignKey?: 'px' | undefined;
  skipAvailabilityCheck?: boolean;
}

export function updateBasketItemQuantityRequest(
  params: UpdateBasketItemQuantity,
): BapiCall<BasketResponseData> {
  return {
    method: 'PATCH',
    endpoint: `baskets/${params.basketKey}/items/${params.itemKey}`,
    params: {
      ...(params.with
        ? {with: basketWithQueryParameter(params.with).join(',')}
        : undefined),
      ...(params.campaignKey ? {campaignKey: params.campaignKey} : undefined),
      ...(params.skipAvailabilityCheck
        ? {skipAvailabilityCheck: params.skipAvailabilityCheck}
        : undefined),
    },
    data: {
      quantity: params.quantity,
    },
  };
}
