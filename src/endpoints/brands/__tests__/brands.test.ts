import {createBrandsEndpointRequest} from '../brands';

it('builds correct endpoint request', () => {
  expect(createBrandsEndpointRequest()).toMatchInlineSnapshot(`
{
  "endpoint": "brands",
  "method": "GET",
  "params": {},
}
`);
});
