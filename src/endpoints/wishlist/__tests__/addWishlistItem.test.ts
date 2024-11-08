import { expect, it } from 'vitest'
import { addWishlistItemEndpointRequest } from '../addWishlistItem'

it('builds correct query', () => {
  expect(
    addWishlistItemEndpointRequest({
      wishlistKey: 'wishlist_1',
      item: {
        productId: 123,
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "productId": 123,
  },
  "endpoint": "/v1/wishlists/wishlist_1/items",
  "method": "POST",
  "params": {},
  "successfulResponseCodes": [
    201,
    409,
    412,
    413,
  ],
}
`)

  expect(
    addWishlistItemEndpointRequest({
      wishlistKey: 'wishlist_1',
      item: {
        variantId: 789,
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "variantId": 789,
  },
  "endpoint": "/v1/wishlists/wishlist_1/items",
  "method": "POST",
  "params": {},
  "successfulResponseCodes": [
    201,
    409,
    412,
    413,
  ],
}
`)

  expect(
    addWishlistItemEndpointRequest({
      wishlistKey: 'wishlist_1',
      item: {
        productId: 1,
      },
      with: {
        items: {
          product: {
            attributes: 'all',
          },
        },
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "productId": 1,
  },
  "endpoint": "/v1/wishlists/wishlist_1/items",
  "method": "POST",
  "params": {
    "with": "items.product.attributes,items.product.images.attributes:legacy(false)",
  },
  "successfulResponseCodes": [
    201,
    409,
    412,
    413,
  ],
}
`)

  expect(
    addWishlistItemEndpointRequest({
      wishlistKey: 'wishlist_1',
      item: {
        productId: 1,
      },
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "productId": 1,
  },
  "endpoint": "/v1/wishlists/wishlist_1/items",
  "method": "POST",
  "params": {
    "campaignKey": "px",
  },
  "successfulResponseCodes": [
    201,
    409,
    412,
    413,
  ],
}
`)

  expect(
    addWishlistItemEndpointRequest({
      wishlistKey: 'wishlist_1',
      pricePromotionKey: 'test',
      item: {
        productId: 123,
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "productId": 123,
  },
  "endpoint": "/v1/wishlists/wishlist_1/items",
  "method": "POST",
  "params": {
    "pricePromotionKey": "test",
  },
  "successfulResponseCodes": [
    201,
    409,
    412,
    413,
  ],
}
`)

  expect(
    addWishlistItemEndpointRequest({
      wishlistKey: 'wishlist_1',
      item: {
        productId: 123,
      },
      itemGroup: {
        id: 'abcdefgh',
        isMainItem: true,
        isRequired: true,
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "itemGroup": {
      "id": "abcdefgh",
      "isMainItem": true,
      "isRequired": true,
    },
    "productId": 123,
  },
  "endpoint": "/v1/wishlists/wishlist_1/items",
  "method": "POST",
  "params": {},
  "successfulResponseCodes": [
    201,
    409,
    412,
    413,
  ],
}
`)

  expect(
    addWishlistItemEndpointRequest({
      wishlistKey: 'wishlist_1',
      item: {
        productId: 123,
      },
      customData: {
        data: 'data',
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "customData": {
      "data": "data",
    },
    "productId": 123,
  },
  "endpoint": "/v1/wishlists/wishlist_1/items",
  "method": "POST",
  "params": {},
  "successfulResponseCodes": [
    201,
    409,
    412,
    413,
  ],
}
`)
})
