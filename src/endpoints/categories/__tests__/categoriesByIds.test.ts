import {createCategoriesByIdsEndpointRequest} from '../categoriesByIds';

it('Builds correct query', () => {
  expect(
    createCategoriesByIdsEndpointRequest({
      categoryIds: [1, 2],
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
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
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
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
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
    "depth": 2,
    "ids": "1,2",
    "with": "properties:name(),descendants",
  },
}
`);
});
