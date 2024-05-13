import { createSearchSuggestionsEndpointRequest } from '../suggestions'

it('builds correct query', () => {
  expect(createSearchSuggestionsEndpointRequest({ term: 'term 1' }))
    .toMatchInlineSnapshot(`
{
  "endpoint": "/v1/search/suggestions",
  "method": "GET",
  "params": {
    "term": "term 1",
    "with": "",
  },
}
`)
})

it('builds correct query with includes', () => {
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
{
  "endpoint": "/v1/search/suggestions",
  "method": "GET",
  "params": {
    "term": "term 1",
    "with": "brands,categories,productNames",
  },
}
`)
})

it('builds correct query with campaign key', () => {
  expect(
    createSearchSuggestionsEndpointRequest({
      term: 'term 1',
      campaignKey: 'px',
      with: {
        products: {
          attributes: { withKey: ['name'] },
          variants: 'all',
        },
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/search/suggestions",
  "method": "GET",
  "params": {
    "campaignKey": "px",
    "term": "term 1",
    "with": "products,products.attributes:key(name),products.variants,products.images.attributes:legacy(false)",
  },
}
`)
})
