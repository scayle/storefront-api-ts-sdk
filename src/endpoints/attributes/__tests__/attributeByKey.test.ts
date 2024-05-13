import { createAttributeByKeyEndpointRequest } from '../attributeByKey'

it('builds correct query', () => {
  expect(createAttributeByKeyEndpointRequest('pattern')).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/attributes/pattern",
  "method": "GET",
}
`)
})
