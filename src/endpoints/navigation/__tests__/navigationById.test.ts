import {createNavigationByIdEndpointRequest} from '../../../endpoints/navigation/navigationById';

it('builds correct endpoint request', () => {
  expect(createNavigationByIdEndpointRequest(350, {})).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/navigation/trees/350",
  "method": "GET",
  "params": {},
}
`);
});
