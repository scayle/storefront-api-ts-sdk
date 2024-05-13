import { addWishlistItemEndpointRequest } from '../addWishlistItem'

it('builds correct query', () => {
  expect(
    addWishlistItemEndpointRequest({
      wishlistKey: 'wishlist_1',
      item: {
        masterKey: 'master_1',
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "masterKey": "master_1",
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
      item: {
        productId: 1,
      },
      childShopId: 456,
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "productId": 1,
    "shopId": 456,
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
      pricePromotionKey: 'test',
      item: {
        masterKey: 'master_1',
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "masterKey": "master_1",
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
})
