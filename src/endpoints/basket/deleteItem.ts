import {BasketWith, basketWithQueryParameter} from './getBasket';
import {BapiCall} from '../../helpers/execute';
import {Basket} from '../../types/Basket';

export interface DeleteItemParameters {
  basketKey: string;
  itemKey: string;

  with?: BasketWith;
  campaignKey?: string;
  skipAvailabilityCheck?: boolean;

  includeItemsWithoutProductData?: boolean;
}

export function deleteBasketItemRequest(params: DeleteItemParameters): BapiCall<Basket> {
  return {
    method: 'DELETE',
    endpoint: `/v1/baskets/${params.basketKey}/items/${params.itemKey}`,
    params: {
      ...(params.with ? {with: basketWithQueryParameter(params.with).join(',')} : undefined),
      ...(params.campaignKey ? {campaignKey: params.campaignKey} : undefined),
      ...(params.skipAvailabilityCheck ? {skipAvailabilityCheck: params.skipAvailabilityCheck} : undefined),
      ...(params.includeItemsWithoutProductData
        ? {
            includeItemsWithoutProductData: params.includeItemsWithoutProductData,
          }
        : undefined),
    },
  };
}
