import {StorefrontAPIClient} from '../../StorefrontAPIClient';
import {nockWithBapiScope, disableNetAndAllowBapiCors} from '../../test-helpers/nock';

disableNetAndAllowBapiCors();

it.skip('Get basket', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/baskets/customer_2137901?shopId=123')
    .replyWithFile(200, __dirname + '/responses/getBasket.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 123,
  });

  const basketKey = 'customer_2137901';

  const basketResponse = await bapi.basket.get(basketKey);

  if (basketResponse.type !== 'success') {
    fail('Expected success response');
  }

  expect(basketResponse.basket).toHaveProperty(`cost`);
  expect(basketResponse.statusCode).toBe(200);
});
