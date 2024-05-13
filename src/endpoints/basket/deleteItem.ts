import type {
  BasketResponseData,
  BasketWith,
} from '../../endpoints/basket/getBasket'
import { basketWithQueryParameter } from '../../endpoints/basket/getBasket'
import type { StorefrontAPICall } from '../../helpers/execute'

export interface DeleteItemParameters {
  basketKey: string
  itemKey: string

  with?: BasketWith
  campaignKey?: string
  skipAvailabilityCheck?: boolean

  includeItemsWithoutProductData?: boolean
}

export function deleteBasketItemRequest(
  params: DeleteItemParameters,
): StorefrontAPICall<BasketResponseData> {
  return {
    method: 'DELETE',
    endpoint: `/v1/baskets/${params.basketKey}/items/${params.itemKey}`,
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
