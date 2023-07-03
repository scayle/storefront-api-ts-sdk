import {createAttributeByKeyEndpointRequest} from '../attributeByKey';

it('Builds correct query', () => {
  expect(createAttributeByKeyEndpointRequest('pattern')).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/attributes/pattern",
  "method": "GET",
}
`);
});
