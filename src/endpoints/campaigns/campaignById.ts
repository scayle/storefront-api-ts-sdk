import {BapiCall} from 'bapi/interfaces/BapiCall';
import {Campaign} from 'bapi/types/campaign';

export type CampaignByIdEndpointResponseData = Campaign;

export function createCampaignByIdEndpointRequest(
  campaignId: number,
): BapiCall<CampaignByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `campaigns/${campaignId}`,
  };
}
