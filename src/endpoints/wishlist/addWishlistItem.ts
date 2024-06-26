import type { StorefrontAPICall } from '../../helpers/execute'
import type {
  Wishlist,
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
}

export enum AddToWishlistFailureKind {
  ItemUnavailable = 'ItemUnavailable',
  MaximumItemCountReached = 'MaximumItemCountReached',
  ItemAlreadyPresent = 'ItemAlreadyPresent',
  Unknown = 'Unknown',
}

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
    },
  }
}

export function addToWishlistFailureKindFromStatusCode(
  statusCode: number,
): AddToWishlistFailureKind {
  switch (statusCode) {
    case 409:
      return AddToWishlistFailureKind.ItemAlreadyPresent

    case 412:
      return AddToWishlistFailureKind.ItemUnavailable

    case 413:
      return AddToWishlistFailureKind.MaximumItemCountReached

    default:
      return AddToWishlistFailureKind.Unknown
  }
}
