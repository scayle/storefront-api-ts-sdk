import type { ValuesType } from 'utility-types'
import type { StorefrontAPICall } from '../../helpers/execute'
import type {
  Wishlist,
  WishlistItemCustomData,
  WishlistItemGroup,
  WishlistWith,
} from '../../types/Wishlist'
import { wishlistWithQueryParameter } from './utils'

export type WishlistItemCreationID =
  | {
    productId: number
  }
  | {
    variantId: number
  }

export interface AddWishlistItemParameters {
  wishlistKey: string
  item: WishlistItemCreationID

  with?: WishlistWith

  campaignKey?: string
  pricePromotionKey?: string

  itemGroup?: WishlistItemGroup
  customData?: WishlistItemCustomData
}

export const AddToWishlistFailureKind = {
  ITEM_UNAVAILABLE: 'ItemUnavailable',
  MAXIMUM_ITEM_COUNT_REACHED: 'MaximumItemCountReached',
  ITEM_ALREADY_PRESENT: 'ItemAlreadyPresent',
  UNKNOWN: 'Unknown',
} as const
// eslint-disable-next-line ts/no-redeclare -- intentionally naming the variable the same as the type
export type AddToWishlistFailureKind = ValuesType<
  typeof AddToWishlistFailureKind
>

export function addWishlistItemEndpointRequest(
  params: AddWishlistItemParameters,
): StorefrontAPICall<Wishlist> {
  return {
    method: 'POST',
    endpoint: `/v1/wishlists/${params.wishlistKey}/items`,
    successfulResponseCodes: [201, 409, 412, 413],
    params: {
      ...(params.with
        ? {
          with: wishlistWithQueryParameter(params.with).join(','),
        }
        : undefined),
      ...(params.campaignKey ? { campaignKey: params.campaignKey } : undefined),
      ...(params.pricePromotionKey
        ? { pricePromotionKey: params.pricePromotionKey }
        : undefined),
    },
    data: {
      ...params.item,
      ...(params.itemGroup ? { itemGroup: params.itemGroup } : undefined),
      ...(params.customData ? { customData: params.customData } : undefined),
    },
  }
}

export function addToWishlistFailureKindFromStatusCode(
  statusCode: number,
): AddToWishlistFailureKind {
  switch (statusCode) {
    case 409:
      return AddToWishlistFailureKind.ITEM_ALREADY_PRESENT

    case 412:
      return AddToWishlistFailureKind.ITEM_UNAVAILABLE

    case 413:
      return AddToWishlistFailureKind.MAXIMUM_ITEM_COUNT_REACHED

    default:
      return AddToWishlistFailureKind.UNKNOWN
  }
}
