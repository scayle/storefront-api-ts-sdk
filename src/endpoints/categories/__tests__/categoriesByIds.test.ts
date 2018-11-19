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
    "ids": "1,2",
  },
}
`);

  expect(
    createCategoriesByIdsEndpointRequest({
      categoryIds: [1, 2],
      depth: 1,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
    "depth": 1,
    "ids": "1,2",
  },
}
`);

  expect(
    createCategoriesByIdsEndpointRequest({
      categoryIds: [1, 2],
      depth: 2,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
    "depth": 2,
    "ids": "1,2",
    "with": "children",
  },
}
`);
});
