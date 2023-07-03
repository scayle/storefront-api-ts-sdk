import {createNavigationAllEndpointRequest} from '../../../endpoints/navigation/navigation';

it('builds correct endpoint request', () => {
  expect(createNavigationAllEndpointRequest({})).toMatchInlineSnapshot(`
Object {
  "endpoint": "navigation/trees",
  "method": "GET",
  "params": Object {},
}
`);
});
