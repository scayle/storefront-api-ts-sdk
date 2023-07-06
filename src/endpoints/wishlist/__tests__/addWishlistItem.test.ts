import {addWishlistItemEndpointRequest} from '../addWishlistItem';

it('Builds correct query', () => {
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
}
`);

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
}
`);

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
}
`);

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
}
`);
});
