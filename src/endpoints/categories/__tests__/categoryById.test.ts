import {createCategoryByIdEndpointRequest} from '../categoryById';

it('Builds correct query', () => {
  expect(
    createCategoryByIdEndpointRequest({
      categoryId: 1234,
      with: {
        children: {
          depth: 2,
          includeHidden: true,
        },
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories/1234",
  "method": "GET",
  "params": Object {
    "depth": 3,
    "showHidden": "true",
    "with": "descendants",
  },
}
`);
});
