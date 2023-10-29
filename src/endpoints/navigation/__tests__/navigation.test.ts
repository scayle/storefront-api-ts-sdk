import {createNavigationTreesEndpointRequest} from '../../../endpoints/navigation/navigation';

it('builds correct endpoint request', () => {
  expect(createNavigationTreesEndpointRequest({})).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/navigation/trees",
  "method": "GET",
  "params": {},
}
`);
});
