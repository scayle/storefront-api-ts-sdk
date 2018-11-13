import {BapiClient} from 'bapi/helpers/BapiClient';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';

disableNetAndAllowBapiCors();

it('Gets filters (with values by default)', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/filters?with=values&filters%5Bcategory%5D=20202&shopId=139')
    .replyWithFile(200, __dirname + '/responses/filters/withValues.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'query',
  });

  const filtersResponse = await bapi.filters.get({where: {categoryId: 20202}});

  expect(filtersResponse.length).toBe(6);
});
