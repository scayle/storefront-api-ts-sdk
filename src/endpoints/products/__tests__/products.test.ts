import {
  createProductsSearchEndpointRequest,
  APISortOption,
  APISortOrder,
} from '../products';

it('Builds correct query', () => {
  expect(
    createProductsSearchEndpointRequest({
      with: {
        categories: 'all',
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "with": "images.attributes:legacy(false),categories",
  },
}
`);

  expect(
    createProductsSearchEndpointRequest({
      sort: {
        by: APISortOption.DateAdded,
        channel: 'size',
        direction: APISortOrder.Descending,
        score: 'category_scores',
      },
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "campaignKey": "px",
    "sort": "new",
    "sortChannel": "size",
    "sortDir": "desc",
    "sortScore": "category_scores",
  },
}
`);

  expect(
    createProductsSearchEndpointRequest({
      pagination: {
        page: 1,
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "page": 1,
  },
}
`);
});
