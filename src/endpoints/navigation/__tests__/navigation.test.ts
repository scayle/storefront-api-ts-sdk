import {createNavigationAllEndpointRequest} from '../../../endpoints/navigation/navigation';

it('builds correct endpoint request', () => {
  expect(createNavigationAllEndpointRequest({})).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/navigation/trees",
  "method": "GET",
  "params": {},
}
`);
});
