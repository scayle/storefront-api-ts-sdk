import {createBrandBySlugEndpointRequest} from '../brandBySlug';

it('builds correct endpoint request', () => {
  expect(createBrandBySlugEndpointRequest('nike')).toMatchInlineSnapshot(`
Object {
  "endpoint": "brands/nike",
  "method": "GET",
}
`);
});
