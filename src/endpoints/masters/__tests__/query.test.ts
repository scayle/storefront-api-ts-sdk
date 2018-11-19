import {createMastersSearchEndpointRequest} from '../query';

it('Builds correct query', () => {
  expect(createMastersSearchEndpointRequest({})).toMatchInlineSnapshot(`
Object {
  "endpoint": "masters",
  "method": "GET",
  "params": Object {},
}
`);

  expect(
    createMastersSearchEndpointRequest({
      pagination: {
        page: 1,
        perPage: 200,
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "masters",
  "method": "GET",
  "params": Object {
    "page": 1,
    "perPage": 200,
  },
}
`);

  expect(
    createMastersSearchEndpointRequest({
      with: {
        products: {attributes: 'all'},
      },
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "masters",
  "method": "GET",
  "params": Object {
    "campaignKey": "px",
    "with": "products.attributes,products.images.attributes:legacy(false)",
  },
}
`);
});
