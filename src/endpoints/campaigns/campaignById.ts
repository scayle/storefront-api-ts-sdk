import type { StorefrontAPICall } from '../../helpers/execute'
import type { Campaign } from '../../types/campaign'

export type CampaignByIdEndpointResponseData = Campaign

export function createCampaignByIdEndpointRequest(
  campaignId: number,
): StorefrontAPICall<CampaignByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/campaigns/${campaignId}`,
  }
}
