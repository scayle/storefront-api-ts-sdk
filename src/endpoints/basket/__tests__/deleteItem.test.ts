import { deleteBasketItemRequest } from '../deleteItem'

it('builds corrects parameter', () => {
  expect(
    deleteBasketItemRequest({
      basketKey: 'basket_1',
      itemKey: 'item_5',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/baskets/basket_1/items/item_5",
  "method": "DELETE",
  "params": {},
}
`)

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
          variant: { attributes: 'all', advancedAttributes: 'all' },
        },
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/baskets/basket_1/items/item_5",
  "method": "DELETE",
  "params": {
    "with": "items.product.attributes,items.product.advancedAttributes,items.product.images.attributes:legacy(false),items.variant.attributes,items.variant.advancedAttributes",
  },
}
`)

  expect(
    deleteBasketItemRequest({
      basketKey: 'basket_1',
      itemKey: 'item_5',
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/baskets/basket_1/items/item_5",
  "method": "DELETE",
  "params": {
    "campaignKey": "px",
  },
}
`)
})
