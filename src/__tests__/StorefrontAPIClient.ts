import type { BasketResponseData } from '../endpoints/basket/getBasket'
import { findBasketItem } from '../StorefrontAPIClient'

describe('findBasketItem', () => {
  it('should return undefined when no item with the variant can be found', () => {
    const item = findBasketItem({
      items: [{
        variant: {
          id: 456,
        },
      }],
    } as unknown as BasketResponseData, {
      variantId: 123,
      itemGroupId: undefined,
    })

    expect(item).toBeUndefined()
  })

  it('should return the item when an item with the variant id is present', () => {
    const item = findBasketItem({
      items: [{
        variant: {
          id: 123,
        },
      }],
    } as unknown as BasketResponseData, {
      variantId: 123,
      itemGroupId: undefined,
    })

    expect(item).toStrictEqual({
      variant: {
        id: 123,
      },
    })
  })

  it('should not return an item if the existing item has an item group but the new one has none', () => {
    const item = findBasketItem({
      items: [{
        variant: {
          id: 123,
        },
        itemGroup: {
          id: 'item-group',
        },
      }],
    } as unknown as BasketResponseData, {
      variantId: 123,
      itemGroupId: undefined,
    })

    expect(item).toBeUndefined()
  })

  it('should not return an item if the existing item has no item group but the new one has an item group', () => {
    const item = findBasketItem({
      items: [{
        variant: {
          id: 123,
        },
      }],
    } as unknown as BasketResponseData, {
      variantId: 123,
      itemGroupId: 'item-group',
    })

    expect(item).toBeUndefined()
  })

  it('should return an item if both items have the same item group', () => {
    const item = findBasketItem({
      items: [{
        variant: {
          id: 123,
        },
        itemGroup: {
          id: 'item-group',
        },
      }],
    } as unknown as BasketResponseData, {
      variantId: 123,
      itemGroupId: 'item-group',
    })

    expect(item).toStrictEqual({
      variant: {
        id: 123,
      },
      itemGroup: {
        id: 'item-group',
      },
    })
  })
})
