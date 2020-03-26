import {disableNetAndAllowBapiCors} from 'bapi/test-helpers/nock';
import {createVariantsByIdsEndpointRequest} from 'bapi/endpoints/variants/variantsByIds';

disableNetAndAllowBapiCors();

test('Product by ID request', async () => {
  expect(
    createVariantsByIdsEndpointRequest({
      variantIds: [1, 2, 3],
      with: {
        attributes: 'all',
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "variants",
  "method": "GET",
  "params": Object {
    "ids": "1,2,3",
    "with": "attributes",
  },
}
`);
});
