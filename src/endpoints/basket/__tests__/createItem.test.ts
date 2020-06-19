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

it('Support sending a child shop ID', () => {
  expect(
    createBasketItemRequest({
      basketKey: 'basket1',
      variantId: 1235,
      quantity: 1,
      childShopId: 456,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "quantity": 1,
    "shopId": 456,
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

it('Builds correct query with campaign key', () => {
  expect(
    createBasketItemRequest({
      basketKey: 'basket1',
      variantId: 1235,
      quantity: 1,
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "quantity": 1,
    "variantId": 1235,
  },
  "endpoint": "baskets/basket1/items",
  "method": "POST",
  "params": Object {
    "campaignKey": "px",
  },
}
`);
});

it('Builds correct query with display data', () => {
  expect(
    createBasketItemRequest({
      basketKey: 'basket1',
      variantId: 1235,
      quantity: 1,
      displayData: {
        identifier: {
          value: 'a-random-value',
          label: 'Product ID',
          key: 'product-id',
        },
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "displayData": Object {
      "identifier": Object {
        "key": "product-id",
        "label": "Product ID",
        "value": "a-random-value",
      },
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

it('Builds correct query with skip availability', () => {
  expect(
    createBasketItemRequest({
      basketKey: 'basket1',
      variantId: 1235,
      quantity: 1,
      skipAvailabilityCheck: true,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "quantity": 1,
    "variantId": 1235,
  },
  "endpoint": "baskets/basket1/items",
  "method": "POST",
  "params": Object {
    "skipAvailabilityCheck": true,
  },
}
`);
});
