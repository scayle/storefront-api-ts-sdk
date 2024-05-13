import { createCategoryBySlugEndpointRequest } from '../categoryBySlug'

it('builds correct query', () => {
  expect(
    createCategoryBySlugEndpointRequest({
      slugPath: ['frauen', 'bekleidung'],
      with: {
        children: 2,
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories/frauen/bekleidung",
  "method": "GET",
  "params": {
    "depth": 3,
    "with": "properties:name(),descendants",
  },
}
`)

  expect(
    createCategoryBySlugEndpointRequest({
      slugPath: ['frauen', 'bekleidung'],
      with: {
        children: 2,
      },
      includeHidden: true,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories/frauen/bekleidung",
  "method": "GET",
  "params": {
    "depth": 3,
    "showHidden": "true",
    "with": "properties:name(),descendants",
  },
}
`)
})
