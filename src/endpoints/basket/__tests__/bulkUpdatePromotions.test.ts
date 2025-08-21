import { expect, it } from 'vitest'
import { bulkUpdatePromotionsRequest } from '../bulkUpdatePromotions'

it('builds correct query with minimal parameters', () => {
  expect(
    bulkUpdatePromotionsRequest({
      basketKey: '123-abc',
      items: [{
        itemId: 'item42',
        promotions: [{
          id: 'SUMMER2025',
          code: 'DISCOUNT10EUR',
        }],
      }],
    }),
  ).toMatchInlineSnapshot(`
    {
      "data": [
        {
          "itemId": "item42",
          "promotions": [
            {
              "code": "DISCOUNT10EUR",
              "id": "SUMMER2025",
            },
          ],
        },
      ],
      "endpoint": "/v1/baskets/123-abc/promotions",
      "headers": {},
      "method": "PUT",
      "params": {},
    }
  `)
})

it('builds correct query with with parameter', () => {
  expect(
    bulkUpdatePromotionsRequest({
      basketKey: '123-abc',
      items: [{
        itemId: 'item42',
        promotions: [{
          id: 'SUMMER2025',
          code: 'DISCOUNT10EUR',
        }],
      }],
      with: {
        items: {
          product: {
            attributes: 'all',
            advancedAttributes: 'all',
          },
          variant: { attributes: 'all', advancedAttributes: 'all' },
        },
      },
    }),
  ).toMatchInlineSnapshot(`
    {
      "data": [
        {
          "itemId": "item42",
          "promotions": [
            {
              "code": "DISCOUNT10EUR",
              "id": "SUMMER2025",
            },
          ],
        },
      ],
      "endpoint": "/v1/baskets/123-abc/promotions",
      "headers": {},
      "method": "PUT",
      "params": {
        "with": "items.product.attributes,items.product.advancedAttributes,items.product.images.attributes:legacy(false),items.variant.attributes,items.variant.advancedAttributes",
      },
    }
  `)
})

it('builds correct query with campaign key', () => {
  expect(
    bulkUpdatePromotionsRequest({
      basketKey: '123-abc',
      items: [{
        itemId: 'item42',
        promotions: [{
          id: 'SUMMER2025',
          code: 'DISCOUNT10EUR',
        }],
      }],
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
    {
      "data": [
        {
          "itemId": "item42",
          "promotions": [
            {
              "code": "DISCOUNT10EUR",
              "id": "SUMMER2025",
            },
          ],
        },
      ],
      "endpoint": "/v1/baskets/123-abc/promotions",
      "headers": {},
      "method": "PUT",
      "params": {
        "campaignKey": "px",
      },
    }
  `)
})

it('builds correct query with price promotion key', () => {
  expect(
    bulkUpdatePromotionsRequest({
      basketKey: '123-abc',
      items: [{
        itemId: 'item42',
        promotions: [{
          id: 'SUMMER2025',
          code: 'DISCOUNT10EUR',
        }],
      }],
      pricePromotionKey: 'price1',
    }),
  ).toMatchInlineSnapshot(`
    {
      "data": [
        {
          "itemId": "item42",
          "promotions": [
            {
              "code": "DISCOUNT10EUR",
              "id": "SUMMER2025",
            },
          ],
        },
      ],
      "endpoint": "/v1/baskets/123-abc/promotions",
      "headers": {},
      "method": "PUT",
      "params": {
        "pricePromotionKey": "price1",
      },
    }
  `)
})

it('builds correct query with includeItemsWithoutProductData', () => {
  expect(
    bulkUpdatePromotionsRequest({
      basketKey: '123-abc',
      items: [{
        itemId: 'item42',
        promotions: [{
          id: 'SUMMER2025',
          code: 'DISCOUNT10EUR',
        }],
      }],
      includeItemsWithoutProductData: true,
    }),
  ).toMatchInlineSnapshot(`
    {
      "data": [
        {
          "itemId": "item42",
          "promotions": [
            {
              "code": "DISCOUNT10EUR",
              "id": "SUMMER2025",
            },
          ],
        },
      ],
      "endpoint": "/v1/baskets/123-abc/promotions",
      "headers": {},
      "method": "PUT",
      "params": {
        "includeItemsWithoutProductData": true,
      },
    }
  `)
})

it('builds correct query with skipAvailabilityCheck', () => {
  expect(
    bulkUpdatePromotionsRequest({
      basketKey: '123-abc',
      items: [{
        itemId: 'item42',
        promotions: [{
          id: 'SUMMER2025',
          code: 'DISCOUNT10EUR',
        }],
      }],
      skipAvailabilityCheck: true,
    }),
  ).toMatchInlineSnapshot(`
    {
      "data": [
        {
          "itemId": "item42",
          "promotions": [
            {
              "code": "DISCOUNT10EUR",
              "id": "SUMMER2025",
            },
          ],
        },
      ],
      "endpoint": "/v1/baskets/123-abc/promotions",
      "headers": {},
      "method": "PUT",
      "params": {
        "skipAvailabilityCheck": true,
      },
    }
  `)
})

it('builds correct query with orderCustomData', () => {
  expect(
    bulkUpdatePromotionsRequest({
      basketKey: '123-abc',
      items: [{
        itemId: 'item42',
        promotions: [{
          id: 'SUMMER2025',
          code: 'DISCOUNT10EUR',
        }],
      }],
      orderCustomData: {
        groups: ['isNew'],
      },
    }),
  ).toMatchInlineSnapshot(`
    {
      "data": [
        {
          "itemId": "item42",
          "promotions": [
            {
              "code": "DISCOUNT10EUR",
              "id": "SUMMER2025",
            },
          ],
        },
      ],
      "endpoint": "/v1/baskets/123-abc/promotions",
      "headers": {
        "X-Order-Custom-Data": "eyJncm91cHMiOlsiaXNOZXciXX0=",
      },
      "method": "PUT",
      "params": {},
    }
  `)
})
