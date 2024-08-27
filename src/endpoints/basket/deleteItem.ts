import type {
  BasketResponseData,
  BasketWith,
} from '../../endpoints/basket/getBasket'
import { basketWithQueryParameter } from '../../endpoints/basket/getBasket'
import type { StorefrontAPICall } from '../../helpers/execute'
import { buildOrderCustomDataHeaders } from './utils'

export interface DeleteItemParameters {
  basketKey: string
  itemKey: string

  with?: BasketWith
  campaignKey?: string
  skipAvailabilityCheck?: boolean

  includeItemsWithoutProductData?: boolean

  orderCustomData?: Record<string, unknown>
}

export function deleteBasketItemRequest(
  params: DeleteItemParameters,
): StorefrontAPICall<BasketResponseData> {
  return {
    method: 'DELETE',
    endpoint: `/v1/baskets/${params.basketKey}/items/${params.itemKey}`,
    headers: {
      ...buildOrderCustomDataHeaders(params.orderCustomData),
    },
    params: {
      ...(params.with
        ? { with: basketWithQueryParameter(params.with).join(',') }
        : undefined),
      ...(params.campaignKey ? { campaignKey: params.campaignKey } : undefined),
      ...(params.skipAvailabilityCheck
        ? { skipAvailabilityCheck: params.skipAvailabilityCheck }
        : undefined),
      ...(params.includeItemsWithoutProductData
        ? {
          includeItemsWithoutProductData: params.includeItemsWithoutProductData,
        }
        : undefined),
    },
  }
}
