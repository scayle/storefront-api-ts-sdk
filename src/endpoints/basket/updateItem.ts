import {BasketWith, basketWithQueryParameter} from './getBasket';
import {BapiCall} from '../../helpers/execute';
import {Basket, BasketItemDisplayData, ItemGroup} from '../../types/Basket';
import {CustomData} from '../../types/CustomData';

export interface UpdateBasketItemQuantity {
  basketKey: string;
  itemKey: string;
  quantity: number;
  with?: BasketWith;
  campaignKey?: string;
  skipAvailabilityCheck?: boolean;
  // Beware that specifying any of `customData`, `displayData`, `pricePromotionKey` will update the _entire_ `customData` for the basket item
  customData?: CustomData;
  displayData?: BasketItemDisplayData;
  pricePromotionKey?: string;
  includeItemsWithoutProductData?: boolean;
  itemGroup?: ItemGroup;
  promotionId?: string | null;
}

export function updateBasketItemQuantityRequest(params: UpdateBasketItemQuantity): BapiCall<Basket> {
  const customData = params.pricePromotionKey
    ? {...params.customData, pricePromotionKey: params.pricePromotionKey}
    : params.customData;

  return {
    method: 'PATCH',
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
    data: {
      quantity: params.quantity,
      ...(customData !== undefined ? {customData} : undefined),
      ...(params.displayData ? {displayData: params.displayData} : undefined),
      ...(params.itemGroup ? {itemGroup: params.itemGroup} : undefined),
      ...(params.promotionId !== undefined ? {promotionId: params.promotionId} : undefined),
    },
  };
}
