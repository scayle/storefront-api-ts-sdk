import {StorefrontAPIClient} from '../../StorefrontAPIClient';
import {nockWithBapiScope} from '../../test-helpers/nock';
import nock from 'nock';

it.skip('Authentication: CloudVault token', async () => {
  nock.disableNetConnect();

  nock('https://api-cloud.example.com/', {
    reqheaders: {
      'access-control-request-headers': 'X-Access-Token',
    },
  })
    .options(/.*/)
    .reply(200, '', {
      'access-control-allow-origin': '*',
      'access-control-allow-headers': 'X-Access-Token',
    })
    .persist();

  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .matchHeader('X-Access-Token', 'foobar123')
    .get('/v1/baskets/customer_2137901?shopId=123')
    .replyWithFile(200, __dirname + '/responses/getBasket.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 123,
    auth: {
      type: 'token',
      token: 'foobar123',
    },
  });

  const basketKey = 'customer_2137901';

  const basketResponse = await bapi.basket.get(basketKey);

  if (basketResponse.type !== 'success') {
    fail('Expected success response');
  }

  expect(basketResponse.basket).toHaveProperty(`cost`);
  expect(basketResponse.statusCode).toBe(200);
});
