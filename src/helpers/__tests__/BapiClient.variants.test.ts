import {BapiClient} from '../../helpers/BapiClient';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from '../../test-helpers/nock';

disableNetAndAllowBapiCors();

it.skip('Gets variants by ID', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/variants')
    .query({ids: '33815815,33815816', shopId: 139})
    .replyWithFile(200, __dirname + '/responses/variants/by_ids.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const response = await bapi.variants.getByIds([33815815, 33815816]);

  expect(response.length).toBe(2);
  expect(response[0].id).toBe(33815815);
  expect(response[0].productId).toBe(3668973);
});
