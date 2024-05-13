import nock from 'nock'
import { StorefrontAPIClient } from '../../StorefrontAPIClient'
import {
  disableNetAndAllowBapiCors,
  nockWithBapiScope,
} from '../../test-helpers/nock'

disableNetAndAllowBapiCors()

it.skip('gets the wishlist', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/v1/wishlists/wishlist_1')
    .query({ shopId: 139 })
    .replyWithFile(200, `${__dirname}/responses/wishlist/get.json`, {
      'Content-Type': 'application/json',
    })

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  })

  const response = await bapi.wishlist.get('wishlist_1')

  expect(response.items.length).toBe(2)
})

it.skip('adds an item to the wishlist', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .post('/v1/wishlists/wishlist_1/items', {
      productId: 1234,
    })
    .query({ shopId: 139 })
    .replyWithFile(200, `${__dirname}/responses/wishlist/get.json`, {
      'Content-Type': 'application/json',
    })

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  })

  const response = await bapi.wishlist.addItem('wishlist_1', {
    productId: 1234,
  })

  expect(response.type).toBe('success')
  expect(response.statusCode).toBe(200)
})

it.skip('additem failure', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .post('/v1/wishlists/wishlist_1/items', {
      productId: 1234,
    })
    .query({ shopId: 139 })
    .reply(
      500,
      {},
      {
        'Content-Type': 'application/json',
      },
    )

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  })

  const response = await bapi.wishlist.addItem('wishlist_1', {
    productId: 1234,
  })

  if (response.type !== 'failure') {
    fail('Expected failure response')
    return
  }

  expect(response.kind).toEqual('Unknown')
  expect(response.statusCode).toEqual(500)
})

it.skip('deletes an item from the wishlist', async () => {
  // For `DELETE` pre-flight request
  nock('https://api-cloud.example.com/').options(/.*/).reply(200, '', {
    'access-control-allow-origin': '*',
  })

  nockWithBapiScope()
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .delete('/v1/wishlists/wishlist_1/items/item_1')
    .query({ shopId: 139 })
    .replyWithFile(200, `${__dirname}/responses/wishlist/get.json`, {
      'Content-Type': 'application/json',
    })

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  })

  const response = await bapi.wishlist.deleteItem('wishlist_1', 'item_1')

  expect(response.items.length).toBe(2)
})
