import {createNavigationByIdEndpointRequest} from '../../../endpoints/navigation/navigationById';

it('builds correct endpoint request', () => {
  expect(createNavigationByIdEndpointRequest(350, {})).toMatchInlineSnapshot(`
{
  "endpoint": "navigation/trees/350",
  "method": "GET",
  "params": {},
}
`);
});
