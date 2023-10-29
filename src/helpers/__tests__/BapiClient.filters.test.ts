import {StorefrontAPIClient} from '../../StorefrontAPIClient';
import {nockWithBapiScope, disableNetAndAllowBapiCors} from '../../test-helpers/nock';

disableNetAndAllowBapiCors();

it.skip('Gets filters (with values by default)', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/filters?with=values&filters%5Bcategory%5D=20202&shopId=139')
    .replyWithFile(200, __dirname + '/responses/filters/withValues.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const filtersResponse = await bapi.filters.get({where: {categoryId: 20202}});

  expect(filtersResponse.length).toBe(6);
});
