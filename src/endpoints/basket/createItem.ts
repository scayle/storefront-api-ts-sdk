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
  childShopId?: number;
  with?: BasketWith;
  customData?: {[key: string]: any; [key: number]: any};
  pricePromotionKey?: string;
  campaignKey?: 'px' | undefined;
}

export function createBasketItemRequest(
  params: CreateBasketItemParameters,
): BapiCall<BasketResponseData> {
  const customData = params.pricePromotionKey
    ? {...params.customData, pricePromotionKey: params.pricePromotionKey}
    : params.customData;

  return {
    method: 'POST',
    endpoint: `baskets/${params.basketKey}/items`,
    params: {
      ...(params.with
        ? {with: basketWithQueryParameter(params.with).join(',')}
        : undefined),
      ...(params.campaignKey ? {campaignKey: params.campaignKey} : undefined),
    },
    data: {
      variantId: params.variantId,
      quantity: params.quantity,
      ...(customData !== undefined ? {customData} : undefined),
      ...(params.childShopId ? {shopId: params.childShopId} : undefined),
    },
  };
}
