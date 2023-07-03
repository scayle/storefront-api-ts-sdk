import {createBrandBySlugEndpointRequest} from '../brandBySlug';

it('builds correct endpoint request', () => {
  expect(createBrandBySlugEndpointRequest('nike')).toMatchInlineSnapshot(`
{
  "endpoint": "brands/nike",
  "method": "GET",
}
`);
});
