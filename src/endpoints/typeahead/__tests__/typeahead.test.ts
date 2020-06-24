import {createTypeaheadSuggestionsEndpointRequest} from '../typeahead';

it('Builds correct query', () => {
  expect(createTypeaheadSuggestionsEndpointRequest({term: 'term 1'}))
    .toMatchInlineSnapshot(`
Object {
  "data": Object {},
  "endpoint": "typeahead",
  "method": "POST",
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
  "data": Object {},
  "endpoint": "typeahead",
  "method": "POST",
  "params": Object {
    "term": "term 2",
    "with": "product.attributes,product.images.attributes:legacy(false),product.priceRange",
  },
}
`);
});

it('Builds correct query for category children', () => {
  expect(
    createTypeaheadSuggestionsEndpointRequest({
      term: 'no children',
      with: {categories: {children: 0}},
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {},
  "endpoint": "typeahead",
  "method": "POST",
  "params": Object {
    "term": "no children",
    "with": "",
  },
}
`);

  expect(
    createTypeaheadSuggestionsEndpointRequest({
      term: '1 level of children',
      with: {categories: {children: 1}}, // needs to send 2 to the API
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {},
  "endpoint": "typeahead",
  "method": "POST",
  "params": Object {
    "categoryDepth": 2,
    "term": "1 level of children",
    "with": "category.children",
  },
}
`);
});

it('Builds correct query for category parents', () => {
  expect(
    createTypeaheadSuggestionsEndpointRequest({
      term: 'no children',
      with: {categories: {parents: 'all'}},
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {},
  "endpoint": "typeahead",
  "method": "POST",
  "params": Object {
    "term": "no children",
    "with": "category.parents",
  },
}
`);
});

it('Builds correct request for category-relative searches', () => {
  expect(
    createTypeaheadSuggestionsEndpointRequest({
      term: 'specific category',
      categoryId: 20236,
      productLimit: 7,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "categoryId": 20236,
    "limit": 7,
  },
  "endpoint": "typeahead",
  "method": "POST",
  "params": Object {
    "term": "specific category",
    "with": "",
  },
}
`);
});
