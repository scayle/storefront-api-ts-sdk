import {it, expect} from 'vitest';
import {createProductsByIdsEndpointRequest} from '../productsByIds';

it('Builds correct query', () => {
  expect(
    createProductsByIdsEndpointRequest({
      productIds: [1, 2],
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "ids": "1,2",
  },
}
`);

  expect(
    createProductsByIdsEndpointRequest({
      productIds: [1, 2],
      with: {
        attributes: 'all',
        variants: {
          attributes: {
            withKey: ['name'],
          },
        },
      },
      includeSellableForFree: false, // don't send, it's the default
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "ids": "1,2",
    "with": "attributes,variants,variants.attributes:key(name),images.attributes:legacy(false)",
  },
}
`);

  expect(
    createProductsByIdsEndpointRequest({
      productIds: [10],
      includeSellableForFree: true,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "ids": "10",
    "includeSellableForFree": true,
  },
}
`);

  expect(() =>
    createProductsByIdsEndpointRequest({
      productIds: [],
    }),
  ).toThrow(`"productIds" parameter must not be an empty array.`);

  expect(
    createProductsByIdsEndpointRequest({
      productIds: [1],
      pricePromotionKey: 'abc123',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "ids": "1",
    "pricePromotionKey": "abc123",
  },
}
`);
});
