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
  campaignKey?: string;
  skipAvailabilityCheck?: boolean;

  includeItemsWithoutProductData?: boolean;
}

export function deleteBasketItemRequest(
  params: DeleteItemParameters,
): BapiCall<BasketResponseData> {
  return {
    method: 'DELETE',
    endpoint: `baskets/${params.basketKey}/items/${params.itemKey}`,
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
