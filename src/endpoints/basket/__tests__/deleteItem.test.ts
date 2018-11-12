import {deleteBasketItemRequest} from '../deleteItem';

it('Builds corrects parameter', () => {
  expect(
    deleteBasketItemRequest({
      basketKey: 'basket_1',
      itemKey: 'item_5',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "baskets/basket_1/items/item_5",
  "method": "DELETE",
  "params": Object {},
}
`);

  expect(
    deleteBasketItemRequest({
      basketKey: 'basket_1',
      itemKey: 'item_5',
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
  "endpoint": "baskets/basket_1/items/item_5",
  "method": "DELETE",
  "params": Object {
    "with": "items.product.attributes,items.product.advancedAttributes,items.product.images.attributes:legacy(false),items.variant.attributes,items.variant.advancedAttributes",
  },
}
`);
});
