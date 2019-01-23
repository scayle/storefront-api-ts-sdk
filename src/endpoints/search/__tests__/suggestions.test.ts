import {createSearchSuggestionsEndpointRequest} from '../suggestions';

it('Builds correct query', () => {
  expect(createSearchSuggestionsEndpointRequest({term: 'term 1'}))
    .toMatchInlineSnapshot(`
Object {
  "endpoint": "search/suggestions",
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
    createSearchSuggestionsEndpointRequest({
      term: 'term 1',
      with: {
        brands: 'all',
        categories: 'all',
        productNames: 'all',
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "search/suggestions",
  "method": "GET",
  "params": Object {
    "term": "term 1",
    "with": "brands,categories,productNames",
  },
}
`);
});

it('Builds correct query', () => {
  expect(
    createSearchSuggestionsEndpointRequest({
      term: 'term 1',
      campaignKey: 'px',
      with: {
        products: {
          attributes: {withKey: ['name']},
          variants: 'all',
        },
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "search/suggestions",
  "method": "GET",
  "params": Object {
    "campaignKey": "px",
    "term": "term 1",
    "with": "products,products.attributes:key(name),products.variants,products.images.attributes:legacy(false)",
  },
}
`);
});
