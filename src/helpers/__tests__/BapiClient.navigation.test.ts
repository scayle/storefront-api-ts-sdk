import {StorefrontAPIClient} from '../../helpers/BapiClient';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from '../../test-helpers/nock';

disableNetAndAllowBapiCors();

it.skip('Gets all navigation trees', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/navigation/trees')
    .query({shopId: 139})
    .replyWithFile(200, __dirname + '/responses/navigation/all.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const response = await bapi.navigation.getAll();

  expect(response.length).toBe(1);
  expect(response[0].items.length).toBe(3);
  expect(response[0].items[0].type).toBe('external');
});

it.skip('Gets navigation tree by id', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/navigation/trees/1')
    .query({shopId: 139})
    .replyWithFile(200, __dirname + '/responses/navigation/byId.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const response = await bapi.navigation.getById(1);

  expect(response.items.length).toBe(3);
  expect(response.items[0].type).toBe('external');
});
