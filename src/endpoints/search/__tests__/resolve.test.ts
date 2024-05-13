import type { SearchResolveEndpointResponseData } from '../resolve'
import { createSearchResolveEndpointRequest } from '../resolve'

it('builds correct query', () => {
  expect(createSearchResolveEndpointRequest({ term: 'maxi rot' }))
    .toMatchInlineSnapshot(`
{
  "endpoint": "/v1/search/resolve",
  "method": "GET",
  "params": {
    "term": "maxi rot",
  },
}
`)
})

it('builds correct query with categoryId', () => {
  expect(
    createSearchResolveEndpointRequest({ term: 'maxi rot', categoryId: 20201 }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/search/resolve",
  "method": "GET",
  "params": {
    "categoryId": 20201,
    "term": "maxi rot",
  },
}
`)
})

it('maps response correctly', () => {
  const response: SearchResolveEndpointResponseData = {
    matches: [
      {
        count: 1,
        match: 'Maxi rot',
        category: {
          match: 'Maxi',
          id: 500913,
          name: 'Maxi',
        },
        attributes: [
          {
            match: 'rot',
            name: 'color',
            attributeGroup: 1,
            attributeId: 38931,
          },
          {
            match: 'kobaltblau',
            name: 'colorDetail',
            attributeGroup: 210,
            attributeId: 38753,
          },
        ],
      },
    ],
  }

  expect(response).toBeTruthy()
})
