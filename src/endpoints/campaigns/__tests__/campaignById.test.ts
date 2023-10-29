import {it, expect} from 'vitest';
import {createCampaignByIdEndpointRequest} from '../campaignById';

it('builds correct endpoint request', () => {
  expect(createCampaignByIdEndpointRequest(5)).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/campaigns/5",
  "method": "GET",
}
`);
});
