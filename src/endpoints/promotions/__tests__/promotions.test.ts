import type { RFC33339Date } from '../../../types/Product'
import { createPromotionsEndpointRequest } from '../promotions'

it('builds correct query', () => {
  expect(createPromotionsEndpointRequest({})).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/promotions",
  "method": "GET",
  "params": {},
}
`)

  expect(
    createPromotionsEndpointRequest({
      pagination: {
        page: 1,
        perPage: 50,
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/promotions",
  "method": "GET",
  "params": {
    "page": 1,
    "perPage": 50,
  },
}
`)

  expect(
    createPromotionsEndpointRequest({
      ids: ['abc', 'def'],
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/promotions",
  "method": "GET",
  "params": {
    "ids": "abc,def",
  },
}
`)

  expect(
    createPromotionsEndpointRequest({
      activeAt: '2023-10-22T19:54:02Z' as RFC33339Date,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/promotions",
  "method": "GET",
  "params": {
    "activeAt": "2023-10-22T19:54:02Z",
  },
}
`)
})
