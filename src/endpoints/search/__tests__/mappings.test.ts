import { createrSearchMappingsEndpointRequest } from '../mappings'

it('builds correct query', () => {
  expect(createrSearchMappingsEndpointRequest({ term: 'term 1' }))
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
