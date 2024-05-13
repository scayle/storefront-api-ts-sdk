import { StorefrontAPIClient } from '../../StorefrontAPIClient'
import {
  disableNetAndAllowBapiCors,
  nockWithBapiScope,
} from '../../test-helpers/nock'

disableNetAndAllowBapiCors()

it.skip('gets product by ID', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/v1/shop-configuration')
    .query({ shopId: 139 })
    .reply(
      200,
      {
        shopId: 139,
        name: 'aboutyou',
        properties: [
          {
            key: 'foo',
            value: 'bar',
          },
        ],
      },
      {
        'Content-Type': 'application/json',
      },
    )

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  })

  const response = await bapi.shopConfiguration.get()

  expect(response.properties[0].key).toBe('foo')
  expect(response.properties[0].value).toBe('bar')
})
