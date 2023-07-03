import {createNavigationAllEndpointRequest} from '../../../endpoints/navigation/navigation';

it('builds correct endpoint request', () => {
  expect(createNavigationAllEndpointRequest({})).toMatchInlineSnapshot(`
{
  "endpoint": "navigation/trees",
  "method": "GET",
  "params": {},
}
`);
});
