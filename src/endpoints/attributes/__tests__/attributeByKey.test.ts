import {createAttributeByKeyEndpointRequest} from '../attributeByKey';

it('Builds correct query', () => {
  expect(createAttributeByKeyEndpointRequest('pattern')).toMatchInlineSnapshot(`
{
  "endpoint": "attributes/pattern",
  "method": "GET",
}
`);
});
