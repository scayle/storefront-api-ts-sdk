import {deleteWishlistEndpointRequest} from '../deleteWishlistItem';

it('Builds correct query', () => {
  expect(
    deleteWishlistEndpointRequest({
      wishlistKey: 'wishlist_1',
      itemKey: 'item_1',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "wishlists/wishlist_1/items/item_1",
  "method": "DELETE",
  "params": Object {},
}
`);

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
Object {
  "endpoint": "wishlists/wishlist_1/items/item_1",
  "method": "DELETE",
  "params": Object {
    "with": "items.product.attributes,items.product.images.attributes:legacy(false)",
  },
}
`);

  expect(
    deleteWishlistEndpointRequest({
      wishlistKey: 'wishlist_1',
      itemKey: 'item_1',
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "wishlists/wishlist_1/items/item_1",
  "method": "DELETE",
  "params": Object {
    "campaignKey": "px",
  },
}
`);
});
