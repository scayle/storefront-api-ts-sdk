import {createCategoriesEndpointRequest} from '../categories';

it('Builds correct query for root categories', () => {
  expect(createCategoriesEndpointRequest({})).toMatchInlineSnapshot(`
{
  "endpoint": "categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "properties:name()",
  },
}
`);

  expect(
    createCategoriesEndpointRequest({
      with: {
        children: 2,
      },
      includeHidden: true,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "categories",
  "method": "GET",
  "params": {
    "depth": 3,
    "showHidden": "true",
    "with": "properties:name(),descendants",
  },
}
`);

  expect(
    createCategoriesEndpointRequest({
      with: {
        properties: {withName: ['category_context']},
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "properties:name(category_context)",
  },
}
`);
});
