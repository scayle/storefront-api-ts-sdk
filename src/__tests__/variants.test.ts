import {disableNetAndAllowBapiCors} from '../test-helpers/nock';
import {createVariantsByIdsEndpointRequest} from '../endpoints/variants/variantsByIds';

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
{
  "endpoint": "variants",
  "method": "GET",
  "params": {
    "ids": "1,2,3",
    "with": "attributes",
  },
}
`);
});
