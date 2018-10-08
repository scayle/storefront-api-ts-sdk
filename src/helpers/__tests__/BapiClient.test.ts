import {BapiClient} from 'bapi/helpers/BapiClient';
import * as nock from 'nock';

nock.disableNetConnect();

nock('https://api-cloud.example.com/')
  .options(/.*/)
  .reply(200, '', {'access-control-allow-origin': '*'})
  .persist();

it('Get basket', async () => {
  nock('https://api-cloud.example.com/')
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/baskets/customer_2137901')
    .replyWithFile(200, __dirname + '/responses/getBasket.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    appId: 139,
  });

  const basketKey = 'customer_2137901';

  const basketResponse = await bapi.basket.get(basketKey);

  if (basketResponse.type !== 'success') {
    fail('Expected success response');
  }

  expect(basketResponse.basket).toHaveProperty(`cost`);
});

it('Basket: Add same variant twice', async () => {
  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    appId: 139,
  });

  const basketKey = 'customer_2137901';

  nock('https://api-cloud.example.com/')
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .post('/v1/baskets/customer_2137901/items', {
      variantId: 35149152,
      quantity: 1,
    })
    .replyWithFile(200, __dirname + '/responses/firstAddToBasket.json', {
      'Content-Type': 'application/json',
    });

  const firstAddToBasketResponse = await bapi.basket.addItem(
    basketKey,
    35149152,
  );

  nock('https://api-cloud.example.com/')
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .post('/v1/baskets/customer_2137901/items', {
      variantId: 35149152,
      quantity: 1,
    })
    .replyWithFile(409, __dirname + '/responses/secondAddToBasket.json', {
      'Content-Type': 'application/json',
    });

  const secondTimeResponse = await bapi.basket.addItem(basketKey, 35149152);

  if (secondTimeResponse.type !== 'failure') {
    fail('Expected failure response');
    return;
  }

  expect(secondTimeResponse.kind).toEqual(0);
  expect(secondTimeResponse.basket).toEqual(firstAddToBasketResponse.basket);
});
