import {execute} from 'bapi/helpers/execute';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';
import {createCategoriesEndpointRequest} from 'bapi/endpoints/categories/categories';

disableNetAndAllowBapiCors();

test('Fetch category by id', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(`/v1/categories?with=descendants&depth=2&shopId=139`)
    .replyWithFile(200, __dirname + '/responses/categories.json', {
      'Content-Type': 'application/json',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    139,
    createCategoriesEndpointRequest({
      with: {
        children: {
          depth: 1,
        },
      },
    }),
  );

  expect(result.data.length).toBe(3);
});

test('Fetch categories (without any explicit depth)', async () => {
  expect(createCategoriesEndpointRequest()).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
    "depth": 1,
    "showHidden": undefined,
  },
}
`);

  expect(createCategoriesEndpointRequest({})).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
    "depth": 1,
    "showHidden": undefined,
  },
}
`);

  expect(createCategoriesEndpointRequest({with: {}})).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
    "depth": 1,
    "showHidden": undefined,
  },
}
`);

  expect(createCategoriesEndpointRequest({with: {children: undefined}}))
    .toMatchInlineSnapshot(`
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
    "depth": 1,
    "showHidden": undefined,
  },
}
`);

  expect(createCategoriesEndpointRequest({with: {parents: 'all'}}))
    .toMatchInlineSnapshot(`
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
    "depth": 1,
    "showHidden": undefined,
    "with": "parents",
  },
}
`);
});

test('Fetch categories (with explicit depth)', async () => {
  expect(createCategoriesEndpointRequest({with: {children: {depth: 1}}}))
    .toMatchInlineSnapshot(`
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
    "depth": 2,
    "showHidden": undefined,
    "with": "descendants",
  },
}
`);

  expect(
    createCategoriesEndpointRequest({
      with: {children: {depth: 1, includeHidden: true}},
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "categories",
  "method": "GET",
  "params": Object {
    "depth": 2,
    "showHidden": "true",
    "with": "descendants",
  },
}
`);
});
