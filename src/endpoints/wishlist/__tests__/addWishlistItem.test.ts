import {addWishlistItemEndpointRequest} from '../addWishlistItem';

it('Builds correct query', () => {
  expect(
    addWishlistItemEndpointRequest({
      wishlistKey: 'wishlist_1',
      item: {
        masterKey: 'master_1',
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "masterKey": "master_1",
  },
  "endpoint": "wishlists/wishlist_1/items",
  "method": "POST",
  "params": Object {},
}
`);

  expect(
    addWishlistItemEndpointRequest({
      wishlistKey: 'wishlist_1',
      item: {
        productId: 123,
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "productId": 123,
  },
  "endpoint": "wishlists/wishlist_1/items",
  "method": "POST",
  "params": Object {},
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
Object {
  "data": Object {
    "variantId": 789,
  },
  "endpoint": "wishlists/wishlist_1/items",
  "method": "POST",
  "params": Object {},
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
Object {
  "data": Object {
    "productId": 1,
  },
  "endpoint": "wishlists/wishlist_1/items",
  "method": "POST",
  "params": Object {
    "with": "items.product.attributes,items.product.images.attributes:legacy(false)",
  },
}
`);
});
