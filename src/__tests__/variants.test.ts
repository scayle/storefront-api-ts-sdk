import { disableNetAndAllowBapiCors } from '../test-helpers/nock'
import { createVariantsByIdsEndpointRequest } from '../endpoints/variants/variantsByIds'

disableNetAndAllowBapiCors()

it('product by ID request', () => {
  expect(
    createVariantsByIdsEndpointRequest({
      variantIds: [1, 2, 3],
      with: {
        attributes: 'all',
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/variants",
  "method": "GET",
  "params": {
    "ids": "1,2,3",
    "with": "attributes",
  },
}
`)
})
