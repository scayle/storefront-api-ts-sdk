import {BapiCall} from '../../helpers/execute';
import {
  BasketResponse,
  BasketItemDisplayData,
  ItemGroup,
} from '../../types/Basket';
import {BasketWith, basketWithQueryParameter} from './getBasket';

export interface CreateBasketItemParameters {
  basketKey: string;
  variantId: number;
  quantity: number;
  with?: BasketWith;
  customData?: {[key: string]: any; [key: number]: any};
  displayData?: BasketItemDisplayData;
  pricePromotionKey?: string;
  campaignKey?: string;
  skipAvailabilityCheck?: boolean;
  includeItemsWithoutProductData?: boolean;
  itemGroup?: ItemGroup;
}

export function createBasketItemRequest(
  params: CreateBasketItemParameters,
): BapiCall<BasketResponse> {
  const customData = params.pricePromotionKey
    ? {...params.customData, pricePromotionKey: params.pricePromotionKey}
    : params.customData;

  return {
    method: 'POST',
    endpoint: `/v1/baskets/${params.basketKey}/items`,
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
    data: {
      variantId: params.variantId,
      quantity: params.quantity,
      ...(customData !== undefined ? {customData} : undefined),
      ...(params.displayData ? {displayData: params.displayData} : undefined),
      ...(params.itemGroup ? {itemGroup: params.itemGroup} : undefined),
    },
  };
}
