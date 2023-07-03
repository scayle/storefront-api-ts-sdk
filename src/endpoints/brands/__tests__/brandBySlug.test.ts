import {createBrandBySlugEndpointRequest} from '../brandBySlug';

it('builds correct endpoint request', () => {
  expect(createBrandBySlugEndpointRequest('nike')).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/brands/nike",
  "method": "GET",
}
`);
});
