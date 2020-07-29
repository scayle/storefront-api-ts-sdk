import {createAttributeByKeyEndpointRequest} from '../attributeByKey';

it('Builds correct query', () => {
  expect(createAttributeByKeyEndpointRequest('pattern')).toMatchInlineSnapshot(`
Object {
  "endpoint": "attributes/pattern",
  "method": "GET",
}
`);
});
