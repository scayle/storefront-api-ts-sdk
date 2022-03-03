import {createBrandsEndpointRequest} from '../brands';

it('builds correct endpoint request', () => {
  expect(createBrandsEndpointRequest()).toMatchInlineSnapshot(`
Object {
  "endpoint": "brands",
  "method": "GET",
  "params": Object {},
}
`);
});
