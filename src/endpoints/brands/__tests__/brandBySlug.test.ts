import { createBrandBySlugEndpointRequest } from '../brandBySlug'

it('builds correct endpoint request', () => {
  expect(createBrandBySlugEndpointRequest('nike')).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/brands/nike",
  "method": "GET",
  "params": {
    "forceSlug": true,
  },
}
`)
  expect(createBrandBySlugEndpointRequest('20')).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/brands/20",
  "method": "GET",
  "params": {
    "forceSlug": true,
  },
}
`)
})
