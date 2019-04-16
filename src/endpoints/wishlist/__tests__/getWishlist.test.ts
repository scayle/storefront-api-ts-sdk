import {getWishlistEndpointRequest} from '../getWishlist';

it('Builds correct query', () => {
  expect(
    getWishlistEndpointRequest({
      wishlistKey: 'wishlist_1',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "wishlists/wishlist_1",
  "method": "GET",
  "params": Object {},
}
`);

  expect(
    getWishlistEndpointRequest({
      wishlistKey: 'wishlist_1',
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
  "endpoint": "wishlists/wishlist_1",
  "method": "GET",
  "params": Object {
    "with": "items.product.attributes,items.product.images.attributes:legacy(false)",
  },
}
`);

  expect(
    getWishlistEndpointRequest({
      wishlistKey: 'wishlist_1',
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "wishlists/wishlist_1",
  "method": "GET",
  "params": Object {
    "campaignKey": "px",
  },
}
`);
});
