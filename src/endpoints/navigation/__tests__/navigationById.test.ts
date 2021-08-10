import {createNavigationByIdEndpointRequest} from 'bapi/endpoints/navigation/navigationById';

it('builds correct endpoint request', () => {
  expect(createNavigationByIdEndpointRequest(350)).toMatchInlineSnapshot(`
Object {
  "endpoint": "navigation/trees/350",
  "method": "GET",
}
`);
});
