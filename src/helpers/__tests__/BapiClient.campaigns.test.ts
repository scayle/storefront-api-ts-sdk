/**
 * @jest-environment node
 */
import { StorefrontAPIClient } from '../../StorefrontAPIClient'
import {
  disableNetAndAllowBapiCors,
  nockWithBapiScope,
} from '../../test-helpers/nock'
import { CampaignSortOption } from '../../endpoints/campaigns/campaigns'
import { APISortOrder } from '../../endpoints/products/products'

disableNetAndAllowBapiCors()

it.skip('gets single campaign by id', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/v1/campaigns/350?shopId=139')
    .replyWithFile(200, `${__dirname}/responses/campaigns/byId.json`, {
      'Content-Type': 'application/json',
    })

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  })

  const campaign = await bapi.campaigns.getById(350)

  expect(campaign.id).toBe(350)
})

it.skip('gets multiple campaigns', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/v1/campaigns?sort=id&sortDir=asc&shopId=139')
    .replyWithFile(200, `${__dirname}/responses/campaigns/all.json`, {
      'Content-Type': 'application/json',
    })

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  })

  const campaignsResponse = await bapi.campaigns.get({
    sort: {
      by: CampaignSortOption.Id,
      direction: APISortOrder.Ascending,
    },
  })

  expect(campaignsResponse.pagination.total).toBe(2)
  expect(campaignsResponse.entities.length).toBe(2)
})
