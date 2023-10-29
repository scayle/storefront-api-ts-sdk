import {it, expect} from 'vitest';
import {createBrandByIdEndpointRequest} from '../brandById';

it('builds correct endpoint request', () => {
  expect(createBrandByIdEndpointRequest(2)).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/brands/2",
  "method": "GET",
}
`);
});
