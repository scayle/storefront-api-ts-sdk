import {createTypeaheadSuggestionsEndpointRequest} from '../typeahead';

it('Builds correct query', () => {
  expect(createTypeaheadSuggestionsEndpointRequest({term: 'term 1'}))
    .toMatchInlineSnapshot(`
Object {
  "endpoint": "typeahead",
  "method": "GET",
  "params": Object {
    "term": "term 1",
    "with": "",
  },
}
`);
});

it('Builds correct query', () => {
  expect(
    createTypeaheadSuggestionsEndpointRequest({
      term: 'term 2',
      with: {products: {attributes: 'all', priceRange: true}},
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "typeahead",
  "method": "GET",
  "params": Object {
    "term": "term 2",
    "with": "product.attributes,product.images.attributes:legacy(false),product.priceRange",
  },
}
`);
});
