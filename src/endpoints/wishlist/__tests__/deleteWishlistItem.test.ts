import { deleteWishlistEndpointRequest } from '../deleteWishlistItem'

it('builds correct query', () => {
  expect(
    deleteWishlistEndpointRequest({
      wishlistKey: 'wishlist_1',
      itemKey: 'item_1',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/wishlists/wishlist_1/items/item_1",
  "method": "DELETE",
  "params": {},
}
`)

  expect(
    deleteWishlistEndpointRequest({
      wishlistKey: 'wishlist_1',
      itemKey: 'item_1',
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
  "endpoint": "/v1/wishlists/wishlist_1/items/item_1",
  "method": "DELETE",
  "params": {
    "with": "items.product.attributes,items.product.images.attributes:legacy(false)",
  },
}
`)

  expect(
    deleteWishlistEndpointRequest({
      wishlistKey: 'wishlist_1',
      itemKey: 'item_1',
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/wishlists/wishlist_1/items/item_1",
  "method": "DELETE",
  "params": {
    "campaignKey": "px",
  },
}
`)

  expect(
    deleteWishlistEndpointRequest({
      wishlistKey: 'wishlist_1',
      itemKey: 'item_1',
      campaignKey: 'px',
      pricePromotionKey: 'test',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/wishlists/wishlist_1/items/item_1",
  "method": "DELETE",
  "params": {
    "campaignKey": "px",
    "pricePromotionKey": "test",
  },
}
`)
})
