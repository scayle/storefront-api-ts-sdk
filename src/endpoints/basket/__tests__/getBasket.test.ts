import {it, expect} from 'vitest';
import {basketWithQueryParameter, getBasketEndpointRequest} from '../getBasket';

it('Builds corrects with query parameter', () => {
  expect(basketWithQueryParameter({})).eq('');

  expect(
    basketWithQueryParameter({
      items: {
        product: {},
        variant: {},
      },
    }),
  ).eq(`items.product,items.product.images.attributes:legacy(false),items.variant`);

  expect(
    basketWithQueryParameter({
      items: {
        product: {
          attributes: 'all',
          advancedAttributes: 'all',
        },
        variant: {attributes: 'all', advancedAttributes: 'all'},
      },
    }),
  ).toEqual(
    `items.product,items.product.attributes,items.product.advancedAttributes,items.product.images.attributes:legacy(false),items.variant,items.variant.attributes,items.variant.advancedAttributes`,
  );

  expect(
    basketWithQueryParameter({
      items: {
        promotion: true,
      },
      applicablePromotions: true,
    }),
  ).toEqual(`items.promotion,applicablePromotions`);
});

it('Builds correct query', () => {
  expect(
    getBasketEndpointRequest({
      basketKey: 'basket1',
      with: {
        items: {
          product: {
            attributes: 'all',
            advancedAttributes: 'all',
          },
          variant: {attributes: 'all', advancedAttributes: 'all'},
        },
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/baskets/basket1",
  "method": "GET",
  "params": {
    "with": "items.product,items.product.attributes,items.product.advancedAttributes,items.product.images.attributes:legacy(false),items.variant,items.variant.attributes,items.variant.advancedAttributes",
  },
}
`);

  expect(
    getBasketEndpointRequest({
      basketKey: 'basket1',
      with: {
        items: {
          variant: {},
        },
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/baskets/basket1",
  "method": "GET",
  "params": {
    "with": "items.variant",
  },
}
`);
});

it('Builds correct query with campaign key', () => {
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
`);
});
