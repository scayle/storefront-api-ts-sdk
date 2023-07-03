import {createCategoriesByIdsEndpointRequest} from '../categoriesByIds';

it('Builds correct query', () => {
  expect(
    createCategoriesByIdsEndpointRequest({
      categoryIds: [1, 2],
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "ids": "1,2",
    "with": "properties:name()",
  },
}
`);

  expect(
    createCategoriesByIdsEndpointRequest({
      categoryIds: [1, 2],
      with: {absoluteDepth: 0},
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "ids": "1,2",
    "with": "properties:name()",
  },
}
`);

  expect(
    createCategoriesByIdsEndpointRequest({
      categoryIds: [1, 2],
      with: {absoluteDepth: 2},
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 2,
    "ids": "1,2",
    "with": "properties:name(),descendants",
  },
}
`);
});
