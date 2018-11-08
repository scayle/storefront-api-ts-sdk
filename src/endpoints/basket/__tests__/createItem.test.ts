import {createBasketItemRequest} from '../createItem';

it('Builds correct query', () => {
  expect(
    createBasketItemRequest({
      basketKey: 'basket1',
      variantId: 1235,
      quantity: 2,
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
Object {
  "data": Object {
    "quantity": 2,
    "variantId": 1235,
  },
  "endpoint": "baskets/basket1/items",
  "method": "POST",
  "params": Object {
    "with": "items.product.attributes,items.product.advancedAttributes,items.product.images.attributes:legacy(false),items.variant.attributes,items.variant.advancedAttributes",
  },
}
`);
});

it('Builds correct query with custom data', () => {
  expect(
    createBasketItemRequest({
      basketKey: 'basket1',
      variantId: 1235,
      quantity: 1,
      customData: {
        pricePromotionKey: 'abc123',
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "customData": Object {
      "pricePromotionKey": "abc123",
    },
    "quantity": 1,
    "variantId": 1235,
  },
  "endpoint": "baskets/basket1/items",
  "method": "POST",
  "params": Object {},
}
`);
});

it('Builds correct query with price promotion key', () => {
  expect(
    createBasketItemRequest({
      basketKey: 'basket1',
      variantId: 1235,
      quantity: 1,
      pricePromotionKey: 'key123',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "customData": Object {
      "pricePromotionKey": "key123",
    },
    "quantity": 1,
    "variantId": 1235,
  },
  "endpoint": "baskets/basket1/items",
  "method": "POST",
  "params": Object {},
}
`);
});

it('Builds correct query with price promotion key and custom data', () => {
  expect(
    createBasketItemRequest({
      basketKey: 'basket1',
      variantId: 1235,
      quantity: 1,
      pricePromotionKey: 'final key',
      customData: {
        pricePromotionKey: 'will be overwritten',
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "customData": Object {
      "pricePromotionKey": "final key",
    },
    "quantity": 1,
    "variantId": 1235,
  },
  "endpoint": "baskets/basket1/items",
  "method": "POST",
  "params": Object {},
}
`);
});
