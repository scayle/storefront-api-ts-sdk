import {it, expect} from 'vitest';
import {createNavigationTreeEndpointRequest} from '../../../endpoints/navigation/navigationById';

it('builds correct endpoint request', () => {
  expect(createNavigationTreeEndpointRequest(350, {})).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/navigation/trees/350",
  "method": "GET",
  "params": {},
}
`);
});
