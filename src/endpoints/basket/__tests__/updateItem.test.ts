import {updateBasketItemQuantityRequest} from '../updateItem';

it('Builds corrects query', () => {
  expect(
    updateBasketItemQuantityRequest({
      basketKey: 'basket_1',
      itemKey: 'item_5',
      quantity: 10,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "quantity": 10,
  },
  "endpoint": "baskets/basket_1/items/item_5",
  "method": "PATCH",
  "params": Object {},
}
`);

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
          variant: {attributes: 'all', advancedAttributes: 'all'},
        },
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "quantity": 10,
  },
  "endpoint": "baskets/basket_1/items/item_5",
  "method": "PATCH",
  "params": Object {
    "with": "items.product.attributes,items.product.advancedAttributes,items.product.images.attributes:legacy(false),items.variant.attributes,items.variant.advancedAttributes",
  },
}
`);
});
