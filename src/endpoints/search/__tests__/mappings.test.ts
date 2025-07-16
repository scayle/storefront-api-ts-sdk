import { createSearchMappingsEndpointRequest } from '../mappings'

it('builds correct query', () => {
  expect(createSearchMappingsEndpointRequest({ term: 'term 1' }))
    .toMatchInlineSnapshot(`
{
  "endpoint": "/v1/search/mappings",
  "method": "GET",
  "params": {
    "term": "term 1",
  },
}
`)
})
