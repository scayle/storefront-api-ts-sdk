import { createBrandsEndpointRequest } from '../brands'

it('builds correct endpoint request', () => {
  expect(createBrandsEndpointRequest()).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/brands",
  "method": "GET",
  "params": {},
}
`)
})
