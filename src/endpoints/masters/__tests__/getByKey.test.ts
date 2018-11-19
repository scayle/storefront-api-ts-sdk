import {createMasterByIdEndpointRequest} from '../getByKey';

it('Builds correct query', () => {
  expect(createMasterByIdEndpointRequest({masterKey: 'product_1'}))
    .toMatchInlineSnapshot(`
Object {
  "endpoint": "masters/product_1",
  "method": "GET",
  "params": Object {},
}
`);

  expect(
    createMasterByIdEndpointRequest({
      masterKey: 'product_1',
      with: {products: {attributes: 'all'}},
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "masters/product_1",
  "method": "GET",
  "params": Object {
    "campaignKey": "px",
    "with": "products.attributes,products.images.attributes:legacy(false)",
  },
}
`);
});
