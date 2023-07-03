import {execute} from '../helpers/execute';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from '../test-helpers/nock';
import {createCategoriesEndpointRequest} from '../endpoints/categories/categories';

disableNetAndAllowBapiCors();

test.skip('Fetch category by id', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(
      `/v1/categories?with=properties%3Aname%28%29%2Cdescendants&depth=2&shopId=139`,
    )
    .replyWithFile(200, __dirname + '/responses/categories.json', {
      'Content-Type': 'application/json',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    139,
    createCategoriesEndpointRequest({
      with: {
        children: 1,
      },
    }),
  );

  expect(result.data.length).toBe(3);
});

test('Fetch categories (without any explicit depth)', async () => {
  expect(createCategoriesEndpointRequest()).toMatchInlineSnapshot(`
{
  "endpoint": "categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "properties:name()",
  },
}
`);

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

  expect(createCategoriesEndpointRequest({with: {}})).toMatchInlineSnapshot(`
{
  "endpoint": "categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "properties:name()",
  },
}
`);

  expect(createCategoriesEndpointRequest({with: {children: undefined}}))
    .toMatchInlineSnapshot(`
{
  "endpoint": "categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "properties:name()",
  },
}
`);
});

test('Fetch categories (with explicit depth)', async () => {
  expect(createCategoriesEndpointRequest({with: {children: 1}}))
    .toMatchInlineSnapshot(`
{
  "endpoint": "categories",
  "method": "GET",
  "params": {
    "depth": 2,
    "with": "properties:name(),descendants",
  },
}
`);

  expect(
    createCategoriesEndpointRequest({
      with: {children: 1},
      includeHidden: true,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "categories",
  "method": "GET",
  "params": {
    "depth": 2,
    "showHidden": "true",
    "with": "properties:name(),descendants",
  },
}
`);
});
