import {getWishlistEndpointRequest} from '../getWishlist';

it('Builds correct query', () => {
  expect(
    getWishlistEndpointRequest({
      wishlistKey: 'wishlist_1',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/wishlists/wishlist_1",
  "method": "GET",
  "params": {},
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
{
  "endpoint": "/v1/wishlists/wishlist_1",
  "method": "GET",
  "params": {
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
{
  "endpoint": "/v1/wishlists/wishlist_1",
  "method": "GET",
  "params": {
    "campaignKey": "px",
  },
}
`);

  expect(
    getWishlistEndpointRequest({
      wishlistKey: 'wishlist_1',
      campaignKey: 'px',
      pricePromotionKey: 'test',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/wishlists/wishlist_1",
  "method": "GET",
  "params": {
    "campaignKey": "px",
    "pricePromotionKey": "test",
  },
}
`);
});
