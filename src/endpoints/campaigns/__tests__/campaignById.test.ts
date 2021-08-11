import {createCampaignByIdEndpointRequest} from '../campaignById';

it('builds correct endpoint request', () => {
  expect(createCampaignByIdEndpointRequest(5)).toMatchInlineSnapshot(`
Object {
  "endpoint": "campaigns/5",
  "method": "GET",
}
`);
});
