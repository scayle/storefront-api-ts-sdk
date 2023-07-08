import {BapiCall} from '../../helpers/execute';
import {Campaign} from '../../types/Campaign';

export type CampaignByIdEndpointResponse = Campaign;

export function createCampaignByIdEndpointRequest(campaignId: number): BapiCall<CampaignByIdEndpointResponse> {
  return {
    method: 'GET',
    endpoint: `/v1/campaigns/${campaignId}`,
  };
}
