import {createBrandByIdEndpointRequest} from '../brandById';

it('builds correct endpoint request', () => {
  expect(createBrandByIdEndpointRequest(2)).toMatchInlineSnapshot(`
{
  "endpoint": "brands/2",
  "method": "GET",
}
`);
});
