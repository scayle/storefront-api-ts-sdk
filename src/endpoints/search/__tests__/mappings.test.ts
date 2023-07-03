import {createrSearchMappingsEndpointRequest} from '../mappings';

it('Builds correct query', () => {
  expect(createrSearchMappingsEndpointRequest({term: 'term 1'}))
    .toMatchInlineSnapshot(`
{
  "endpoint": "search/mappings",
  "method": "GET",
  "params": {
    "term": "term 1",
  },
}
`);
});
