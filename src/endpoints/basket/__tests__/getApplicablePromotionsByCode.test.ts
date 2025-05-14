import { expect, it } from 'vitest'
import { getApplicablePromotionsByCodeRequest } from '../getApplicablePromotionsByCode'

it('builds correct query with minimal parameters', () => {
  expect(
    getApplicablePromotionsByCodeRequest({
      basketKey: '123-abc',
      promotionCode: 'SUMMER2024',
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "promotionCode": "SUMMER2024",
  },
  "endpoint": "/v1/baskets/123-abc/promotion-code",
  "headers": {},
  "method": "POST",
  "params": {},
}
`)
})

it('builds correct query with with parameter', () => {
  expect(
    getApplicablePromotionsByCodeRequest({
      basketKey: '123-abc',
      promotionCode: 'SUMMER2024',
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
  "data": {
    "promotionCode": "SUMMER2024",
  },
  "endpoint": "/v1/baskets/123-abc/promotion-code",
  "headers": {},
  "method": "POST",
  "params": {
    "with": "items.product.attributes,items.product.advancedAttributes,items.product.images.attributes:legacy(false),items.variant.attributes,items.variant.advancedAttributes",
  },
}
`)
})

it('builds correct query with campaign key', () => {
  expect(
    getApplicablePromotionsByCodeRequest({
      basketKey: '123-abc',
      promotionCode: 'SUMMER2024',
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "promotionCode": "SUMMER2024",
  },
  "endpoint": "/v1/baskets/123-abc/promotion-code",
  "headers": {},
  "method": "POST",
  "params": {
    "campaignKey": "px",
  },
}
`)
})

it('builds correct query with price promotion key', () => {
  expect(
    getApplicablePromotionsByCodeRequest({
      basketKey: '123-abc',
      promotionCode: 'SUMMER2024',
      pricePromotionKey: 'price1',
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "promotionCode": "SUMMER2024",
  },
  "endpoint": "/v1/baskets/123-abc/promotion-code",
  "headers": {},
  "method": "POST",
  "params": {
    "pricePromotionKey": "price1",
  },
}
`)
})

it('builds correct query with includeItemsWithoutProductData', () => {
  expect(
    getApplicablePromotionsByCodeRequest({
      basketKey: '123-abc',
      promotionCode: 'SUMMER2024',
      includeItemsWithoutProductData: true,
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "promotionCode": "SUMMER2024",
  },
  "endpoint": "/v1/baskets/123-abc/promotion-code",
  "headers": {},
  "method": "POST",
  "params": {
    "includeItemsWithoutProductData": true,
  },
}
`)
})

it('builds correct query with orderCustomData', () => {
  expect(
    getApplicablePromotionsByCodeRequest({
      basketKey: '123-abc',
      promotionCode: 'SUMMER2024',
      orderCustomData: {
        groups: ['isNew'],
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "data": {
    "promotionCode": "SUMMER2024",
  },
  "endpoint": "/v1/baskets/123-abc/promotion-code",
  "headers": {
    "X-Order-Custom-Data": "eyJncm91cHMiOlsiaXNOZXciXX0=",
  },
  "method": "POST",
  "params": {},
}
`)
})
