import {createCategoryByIdEndpointRequest} from '../categoryById';

it('Builds correct query', () => {
  expect(
    createCategoryByIdEndpointRequest({
      categoryId: 1234,
      with: {
        children: 2,
      },
      includeHidden: true,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories/1234",
  "method": "GET",
  "params": Object {
    "depth": 3,
    "showHidden": "true",
    "with": "properties:name(),descendants",
  },
}
`);

  expect(
    createCategoryByIdEndpointRequest({
      categoryId: 1234,
      with: {
        properties: 'all',
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories/1234",
  "method": "GET",
  "params": Object {
    "depth": 1,
    "with": "properties",
  },
}
`);

  expect(
    createCategoryByIdEndpointRequest({
      categoryId: 1234,
      with: {
        properties: {withName: []},
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories/1234",
  "method": "GET",
  "params": Object {
    "depth": 1,
    "with": "properties:name()",
  },
}
`);

  expect(
    createCategoryByIdEndpointRequest({
      categoryId: 1234,
      with: {
        properties: {withName: ['category_context']},
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories/1234",
  "method": "GET",
  "params": Object {
    "depth": 1,
    "with": "properties:name(category_context)",
  },
}
`);

  expect(
    createCategoryByIdEndpointRequest({
      categoryId: 1234,
      with: {
        properties: {withName: ['category_context', 'reference_id']},
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories/1234",
  "method": "GET",
  "params": Object {
    "depth": 1,
    "with": "properties:name(category_context|reference_id)",
  },
}
`);
});
