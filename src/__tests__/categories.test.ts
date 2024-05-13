import { execute } from '../helpers/execute'
import {
  disableNetAndAllowBapiCors,
  nockWithBapiScope,
} from '../test-helpers/nock'
import { createCategoriesEndpointRequest } from '../endpoints/categories/categories'

disableNetAndAllowBapiCors()

it.skip('fetch category by id', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get(
      `/v1/categories?with=properties%3Aname%28%29%2Cdescendants&depth=2&shopId=139`,
    )
    .replyWithFile(200, `${__dirname}/responses/categories.json`, {
      'Content-Type': 'application/json',
    })

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    139,
    createCategoriesEndpointRequest({
      with: {
        children: 1,
      },
    }),
  )

  expect(result.data.length).toBe(3)
})

it('fetch categories (without any explicit depth)', () => {
  expect(createCategoriesEndpointRequest()).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "properties:name()",
  },
}
`)

  expect(createCategoriesEndpointRequest({})).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "properties:name()",
  },
}
`)

  expect(createCategoriesEndpointRequest({ with: {} })).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "properties:name()",
  },
}
`)

  expect(createCategoriesEndpointRequest({ with: { children: undefined } }))
    .toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 1,
    "with": "properties:name()",
  },
}
`)
})

it('fetch categories (with explicit depth)', () => {
  expect(createCategoriesEndpointRequest({ with: { children: 1 } }))
    .toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 2,
    "with": "properties:name(),descendants",
  },
}
`)

  expect(
    createCategoriesEndpointRequest({
      with: { children: 1 },
      includeHidden: true,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/categories",
  "method": "GET",
  "params": {
    "depth": 2,
    "showHidden": "true",
    "with": "properties:name(),descendants",
  },
}
`)
})
