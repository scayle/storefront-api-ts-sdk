import {StorefrontAPIClient} from '../../BapiClient';
import {nockWithBapiScope} from '../../test-helpers/nock';
import * as nock from 'nock';

it.skip('Authentication: Basic Auth Implicit', async () => {
  nock.disableNetConnect();

  nock('https://api-cloud.example.com/', {
    reqheaders: {
      'access-control-request-headers': 'Authorization',
    },
  })
    .options(/.*/)
    .reply(200, '', {
      'access-control-allow-origin': '*',
      'access-control-allow-headers': 'Authorization',
    })
    .persist();

  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/baskets/customer_2137901?shopId=123')
    .basicAuth({user: 'user1', pass: 'secret'})
    .replyWithFile(200, __dirname + '/responses/getBasket.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 123,
    auth: {
      username: 'user1',
      password: 'secret',
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

it.skip('Authentication: Basic Auth Explicit', async () => {
  nock.disableNetConnect();

  nock('https://api-cloud.example.com/', {
    reqheaders: {
      'access-control-request-headers': 'Authorization',
    },
  })
    .options(/.*/)
    .reply(200, '', {
      'access-control-allow-origin': '*',
      'access-control-allow-headers': 'Authorization',
    })
    .persist();

  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/baskets/customer_2137901?shopId=123')
    .basicAuth({user: 'user1', pass: 'secret'})
    .replyWithFile(200, __dirname + '/responses/getBasket.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 123,
    auth: {
      username: 'user1',
      password: 'secret',
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
