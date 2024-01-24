import {BapiCall} from '../../interfaces/BapiCall';
import {Campaign} from '../../types/campaign';

export type CampaignByIdEndpointResponseData = Campaign;

export function createCampaignByIdEndpointRequest(
  campaignId: number,
): BapiCall<CampaignByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `campaigns/${campaignId}`,
  };
}
