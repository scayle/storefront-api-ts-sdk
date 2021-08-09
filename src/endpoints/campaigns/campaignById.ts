import {BapiCall} from 'bapi/interfaces/BapiCall';

export type Campaign = {
  id: number;
  key: string;
  name: string;
  description: string;
  reduction: number;
  start_at: string | null;
  end_at: string | null;
};

export type CampaignByIdEndpointResponseData = Campaign;

export function createCampaignByIdEndpointRequest(
  campaignId: number,
): BapiCall<CampaignByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `campaigns/${campaignId}`,
  };
}
