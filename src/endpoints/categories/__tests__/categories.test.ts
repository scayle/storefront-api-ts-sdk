import {createCategoriesEndpointRequest} from '../categories';

it('Builds correct query for root categories', () => {
  expect(createCategoriesEndpointRequest({})).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
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
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
    "depth": 3,
    "showHidden": "true",
    "with": "properties:name(),descendants",
  },
}
`);
});
