import { createCategoriesEndpointRequest } from '../categories'

it('builds correct query for root categories', () => {
  expect(createCategoriesEndpointRequest({})).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "properties:name()",
  },
}
`)

  expect(
    createCategoriesEndpointRequest({
      with: {
        children: 2,
      },
      includeHidden: true,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 3,
    "showHidden": "true",
    "with": "properties:name(),descendants",
  },
}
`)

  expect(
    createCategoriesEndpointRequest({
      with: {
        properties: { withName: ['category_context'] },
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "properties:name(category_context)",
  },
}
`)

  expect(
    createCategoriesEndpointRequest({
      with: {
        includeProductSorting: true,
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "productSorting,properties:name()",
  },
}
`)

  expect(
    createCategoriesEndpointRequest({
      with: {
        includeProductSorting: false,
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "properties:name()",
  },
}
`)
})
