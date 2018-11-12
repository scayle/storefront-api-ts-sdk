import {createProductsByIdsEndpointRequest} from '../productsByIds';

it('Builds correct query', () => {
  expect(
    createProductsByIdsEndpointRequest({
      productIds: [1, 2],
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "campaignKey": undefined,
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
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "campaignKey": undefined,
    "ids": "1,2",
    "with": "attributes,variants,variants.attributes:key(name),images.attributes:legacy(false)",
  },
}
`);
});
