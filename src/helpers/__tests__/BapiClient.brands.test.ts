import { StorefrontAPIClient } from '../../StorefrontAPIClient'
import {
  disableNetAndAllowBapiCors,
  nockWithBapiScope,
} from '../../test-helpers/nock'

disableNetAndAllowBapiCors()

it.skip('gets brand by ID', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/v1/brands/2')
    .query({ shopId: 139 })
    .replyWithFile(200, `${__dirname}/responses/brands/getById.json`, {
      'Content-Type': 'application/json',
    })

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  })

  const response = await bapi.brands.getById(2)

  expect(response.id).toBe(2)
})

it.skip('get brands', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/v1/brands')
    .query({ perPage: 2, shopId: 139 })
    .replyWithFile(200, `${__dirname}/responses/brands/get.json`, {
      'Content-Type': 'application/json',
    })

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  })

  const response = await bapi.brands.get({
    pagination: {
      perPage: 2,
    },
  })

  expect(response.entities.length).toBe(2)
})
