import {
  basketWithQueryParameter,
  getBasketEndpointRequest,
} from '../getBasket'

it('builds corrects with query parameter', () => {
  expect(basketWithQueryParameter({})).toMatchInlineSnapshot(`[]`)

  expect(
    basketWithQueryParameter({
      items: {
        product: {},
        variant: {},
      },
    }),
  ).toMatchInlineSnapshot(`
[
  "items.product.images.attributes:legacy(false)",
]
`)

  expect(
    basketWithQueryParameter({
      items: {
        product: {
          attributes: 'all',
          advancedAttributes: 'all',
        },
        variant: { attributes: 'all', advancedAttributes: 'all' },
      },
    }),
  ).toMatchInlineSnapshot(`
[
  "items.product.attributes",
  "items.product.advancedAttributes",
  "items.product.images.attributes:legacy(false)",
  "items.variant.attributes",
  "items.variant.advancedAttributes",
]
`)

  expect(
    basketWithQueryParameter({
      items: {
        product: {
          attributes: 'all',
          advancedAttributes: 'all',
        },
        variant: {
          attributes: {
            withKey: ['a', 'b'],
          },
          advancedAttributes: {
            ofType: ['design'],
          },
        },
      },
    }),
  ).toMatchInlineSnapshot(`
[
  "items.product.attributes",
  "items.product.advancedAttributes",
  "items.product.images.attributes:legacy(false)",
  "items.variant.attributes:key(a|b)",
  "items.variant.advancedAttributes:type(design)",
]
`)

  expect(
    basketWithQueryParameter({
      items: {
        promotion: true,
      },
      applicablePromotions: true,
    }),
  ).toMatchInlineSnapshot(`
[
  "items.promotion",
  "applicablePromotions",
]
`)
})

it('builds correct query', () => {
  expect(
    getBasketEndpointRequest({
      basketKey: 'basket1',
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
  "endpoint": "/v1/baskets/basket1",
  "method": "GET",
  "params": {
    "with": "items.product.attributes,items.product.advancedAttributes,items.product.images.attributes:legacy(false),items.variant.attributes,items.variant.advancedAttributes",
  },
}
`)

  expect(
    getBasketEndpointRequest({
      basketKey: 'basket1',
      with: {
        items: {
          variant: { stock: { customData: true } },
        },
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/baskets/basket1",
  "method": "GET",
  "params": {
    "with": "items.variant.stock,items.variant.stock.customData",
  },
}
`)
})

it('builds correct query with campaign key', () => {
  expect(
    getBasketEndpointRequest({
      basketKey: 'basket1',
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/baskets/basket1",
  "method": "GET",
  "params": {
    "campaignKey": "px",
  },
}
`)
})

it('builds correct query with checkoutShopId', () => {
  expect(
    getBasketEndpointRequest({
      basketKey: 'basket1',
      checkoutShopId: 589,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/baskets/basket1",
  "method": "GET",
  "params": {
    "checkoutShopId": 589,
  },
}
`)
})
