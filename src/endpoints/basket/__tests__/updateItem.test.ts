import { expect, it } from 'vitest'
import { updateBasketItemQuantityRequest } from '../updateItem'

it('builds corrects query', () => {
  expect(
    updateBasketItemQuantityRequest({
      basketKey: 'basket_1',
      itemKey: 'item_5',
      quantity: 10,
    }),
  ).toEqual(
    {
      'data': {
        'quantity': 10,
      },
      'endpoint': '/v1/baskets/basket_1/items/item_5',
      'headers': {},
      'method': 'PATCH',
      'params': {},
      'successfulResponseCodes': [
        200,
        206,
        404,
        412,
        413,
      ],
    },
  )

  expect(
    updateBasketItemQuantityRequest({
      basketKey: 'basket_1',
      itemKey: 'item_5',
      quantity: 10,
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
  ).toEqual(
    {
      'data': {
        'quantity': 10,
      },
      'endpoint': '/v1/baskets/basket_1/items/item_5',
      'headers': {},
      'method': 'PATCH',
      'params': {
        'with':
          'items.product.attributes,items.product.advancedAttributes,items.product.images.attributes:legacy(false),items.variant.attributes,items.variant.advancedAttributes',
      },
      'successfulResponseCodes': [
        200,
        206,
        404,
        412,
        413,
      ],
    },
  )

  expect(
    updateBasketItemQuantityRequest({
      basketKey: 'basket_1',
      itemKey: 'item_5',
      quantity: 10,
      campaignKey: 'px',
    }),
  ).toEqual(
    {
      'data': {
        'quantity': 10,
      },
      'endpoint': '/v1/baskets/basket_1/items/item_5',
      'headers': {},
      'method': 'PATCH',
      'params': {
        'campaignKey': 'px',
      },
      'successfulResponseCodes': [
        200,
        206,
        404,
        412,
        413,
      ],
    },
  )

  expect(
    updateBasketItemQuantityRequest({
      basketKey: 'basket_1',
      itemKey: 'item_5',
      quantity: 10,
      promotionId: null,
    }),
  ).toEqual(
    {
      'data': {
        'promotionId': null,
        'quantity': 10,
      },
      'endpoint': '/v1/baskets/basket_1/items/item_5',
      'headers': {},
      'method': 'PATCH',
      'params': {},
      'successfulResponseCodes': [
        200,
        206,
        404,
        412,
        413,
      ],
    },
  )

  expect(
    updateBasketItemQuantityRequest({
      basketKey: 'basket_1',
      itemKey: 'item_5',
      quantity: 10,
      promotionId: 'abc',
    }),
  ).toEqual(
    {
      'data': {
        'promotionId': 'abc',
        'quantity': 10,
      },
      'endpoint': '/v1/baskets/basket_1/items/item_5',
      'headers': {},
      'method': 'PATCH',
      'params': {},
      'successfulResponseCodes': [
        200,
        206,
        404,
        412,
        413,
      ],
    },
  )

  expect(
    updateBasketItemQuantityRequest({
      basketKey: 'basket_1',
      itemKey: 'item_5',
      quantity: 10,
      orderCustomData: {
        groups: ['isNew'],
      },
    }),
  ).toEqual(
    {
      'data': {
        'quantity': 10,
      },
      'endpoint': '/v1/baskets/basket_1/items/item_5',
      'headers': {
        'X-Order-Custom-Data': 'eyJncm91cHMiOlsiaXNOZXciXX0=',
      },
      'method': 'PATCH',
      'params': {},
      'successfulResponseCodes': [
        200,
        206,
        404,
        412,
        413,
      ],
    },
  )
})
