import {createrSearchMappingsEndpointRequest} from '../mappings';

it('Builds correct query', () => {
  expect(createrSearchMappingsEndpointRequest({term: 'term 1'}))
    .toMatchInlineSnapshot(`
Object {
  "endpoint": "search/mappings",
  "method": "GET",
  "params": Object {
    "term": "term 1",
  },
}
`);
});
