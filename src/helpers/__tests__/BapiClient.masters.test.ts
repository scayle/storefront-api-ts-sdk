import {BapiClient} from 'bapi/helpers/BapiClient';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';

disableNetAndAllowBapiCors({shopIdHeader: true});

it('Gets master', async () => {
  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/masters/master_1')
    .replyWithFile(200, __dirname + '/responses/masters/getSingle.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const response = await bapi.masters.getByKey('master_1');

  expect(response.id).toBe('master_1');
  expect(response.products.length).toBe(1);
});

it('Queries masters', async () => {
  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/masters')
    .replyWithFile(200, __dirname + '/responses/masters/getAll.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const response = await bapi.masters.query({});

  expect(response.entities.length).toBe(1);
  expect(response.entities[0].products.length).toBe(1);
});
