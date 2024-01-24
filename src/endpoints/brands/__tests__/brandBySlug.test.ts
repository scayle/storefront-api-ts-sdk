import {createBrandBySlugEndpointRequest} from '../brandBySlug';

it('builds correct endpoint request', () => {
  expect(createBrandBySlugEndpointRequest('nike')).toMatchInlineSnapshot(`
{
  "endpoint": "brands/nike",
  "method": "GET",
  "params": {
    "forceSlug": true,
  },
}
`);
  expect(createBrandBySlugEndpointRequest('20')).toMatchInlineSnapshot(`
{
  "endpoint": "brands/20",
  "method": "GET",
  "params": {
    "forceSlug": true,
  },
}
`);
});
