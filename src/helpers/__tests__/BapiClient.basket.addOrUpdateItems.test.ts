import {BapiClient, ExistingItemHandling} from 'bapi/helpers/BapiClient';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';
import nock = require('nock');

disableNetAndAllowBapiCors({shopIdHeader: true});

it('BapiClient.addOrUpdateItems: Does nothing for new variant with quantity 0', async () => {
  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/baskets/aboutyou_customer_4351754')
    .replyWithFile(
      200,
      __dirname + '/responses/basket-addOrUpdateItems/basket-with-1-item.json',
      {
        'Content-Type': 'application/json',
      },
    );

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const basketKey = 'aboutyou_customer_4351754';

  const basketResponse = await bapi.basket.addOrUpdateItems(basketKey, [
    {
      variantId: 1234,
      quantity: 0,
    },
  ]);

  if (basketResponse.type !== 'success') {
    fail('Expected success response');
  }

  expect(basketResponse.basket).toHaveProperty(`cost`);

  expect(nock.isDone()).toBeTruthy();
});

it('BapiClient.addOrUpdateItems: Deletes existing variant variant with quantity 0 when using "replace existing" strategy', async () => {
  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/baskets/aboutyou_customer_4351754')
    .replyWithFile(
      200,
      __dirname + '/responses/basket-addOrUpdateItems/basket-with-1-item.json',
      {
        'Content-Type': 'application/json',
      },
    );

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .delete(
      '/v1/baskets/aboutyou_customer_4351754/items/2f321b8a934c34c5620833cfb1451a6e',
    )
    .replyWithFile(
      200,
      __dirname + '/responses/basket-addOrUpdateItems/empty-basket.json',
      {
        'Content-Type': 'application/json',
      },
    );

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const basketKey = 'aboutyou_customer_4351754';

  const basketResponse = await bapi.basket.addOrUpdateItems(
    basketKey,
    [
      {
        variantId: 8683280,
        quantity: 0,
      },
    ],
    {},
    {existingItemHandling: ExistingItemHandling.ReplaceExisting},
  );

  if (basketResponse.type !== 'success') {
    fail('Expected success response');
  }

  expect(basketResponse.basket.items.length).toBe(0);

  expect(nock.isDone()).toBeTruthy();
});

it('BapiClient.addOrUpdateItems: Creates new item for new variant', async () => {
  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/baskets/aboutyou_customer_4351754')
    .replyWithFile(
      200,
      __dirname + '/responses/basket-addOrUpdateItems/basket-with-1-item.json',
      {
        'Content-Type': 'application/json',
      },
    );
  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .post('/v1/baskets/aboutyou_customer_4351754/items', {
      variantId: 1234,
      quantity: 1,
    })
    .replyWithFile(
      200,
      __dirname +
        '/responses/basket-addOrUpdateItems/basket-with-2-items-including-new-variant-1234.json',
      {
        'Content-Type': 'application/json',
      },
    );

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const basketKey = 'aboutyou_customer_4351754';

  const basketResponse = await bapi.basket.addOrUpdateItems(basketKey, [
    {
      variantId: 1234,
    },
  ]);

  if (basketResponse.type !== 'success') {
    fail('Expected success response');
  }

  expect(basketResponse.basket.items.length).toBe(2);

  expect(nock.isDone()).toBeTruthy();
});

it('BapiClient.addOrUpdateItems: Handles failures (responding with the last basket)', async () => {
  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/baskets/aboutyou_customer_4351754')
    .replyWithFile(
      200,
      __dirname + '/responses/basket-addOrUpdateItems/basket-with-1-item.json',
      {
        'Content-Type': 'application/json',
      },
    );

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .post('/v1/baskets/aboutyou_customer_4351754/items', {
      variantId: 1234,
      quantity: 1,
    })
    .reply(500, {});

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const basketKey = 'aboutyou_customer_4351754';

  const basketResponse = await bapi.basket.addOrUpdateItems(basketKey, [
    {
      variantId: 1234,
    },
  ]);

  if (basketResponse.type !== 'failure') {
    fail('Expected failure response');
    return;
  }

  expect(basketResponse.basket.items.length).toBe(1);
  expect(basketResponse.failedVariants).toEqual([1234]);

  expect(nock.isDone()).toBeTruthy();
});

it('BapiClient.addOrUpdateItems: Replaces existing item with combined quantity (by default)', async () => {
  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/baskets/aboutyou_customer_4351754')
    .replyWithFile(
      200,
      __dirname + '/responses/basket-addOrUpdateItems/basket-with-1-item.json',
      {
        'Content-Type': 'application/json',
      },
    );

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .delete(
      '/v1/baskets/aboutyou_customer_4351754/items/2f321b8a934c34c5620833cfb1451a6e',
    )
    .replyWithFile(
      200,
      __dirname + '/responses/basket-addOrUpdateItems/empty-basket.json',
      {
        'Content-Type': 'application/json',
      },
    );

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .post('/v1/baskets/aboutyou_customer_4351754/items', {
      variantId: 8683280,
      quantity: 5,
      customData: {pricePromotionKey: 'some-pPK'},
    })
    .replyWithFile(
      200,
      __dirname + '/responses/basket-addOrUpdateItems/basket-with-1-item.json',
      {
        'Content-Type': 'application/json',
      },
    );

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const basketKey = 'aboutyou_customer_4351754';

  const basketResponse = await bapi.basket.addOrUpdateItems(basketKey, [
    {
      variantId: 8683280,
      quantity: 4,
      params: {pricePromotionKey: 'some-pPK'},
    },
  ]);

  if (basketResponse.type !== 'success') {
    fail('Expected success response');
  }

  expect(basketResponse.basket.items.length).toBe(1);

  expect(nock.isDone()).toBeTruthy();
});

it('BapiClient.addOrUpdateItems: Replaces existing item (with origin quantity, using replace strategy)', async () => {
  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/baskets/aboutyou_customer_4351754')
    .replyWithFile(
      200,
      __dirname + '/responses/basket-addOrUpdateItems/basket-with-1-item.json',
      {
        'Content-Type': 'application/json',
      },
    );

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .delete(
      '/v1/baskets/aboutyou_customer_4351754/items/2f321b8a934c34c5620833cfb1451a6e',
    )
    .replyWithFile(
      200,
      __dirname + '/responses/basket-addOrUpdateItems/empty-basket.json',
      {
        'Content-Type': 'application/json',
      },
    );

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .post('/v1/baskets/aboutyou_customer_4351754/items', {
      variantId: 8683280,
      quantity: 4,
    })
    .replyWithFile(
      200,
      __dirname + '/responses/basket-addOrUpdateItems/basket-with-1-item.json',
      {
        'Content-Type': 'application/json',
      },
    );

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const basketKey = 'aboutyou_customer_4351754';

  const basketResponse = await bapi.basket.addOrUpdateItems(
    basketKey,
    [
      {
        variantId: 8683280,
        quantity: 4,
      },
    ],
    {},
    {existingItemHandling: ExistingItemHandling.ReplaceExisting},
  );

  if (basketResponse.type !== 'success') {
    fail('Expected success response');
  }

  expect(basketResponse.basket.items.length).toBe(1);

  expect(nock.isDone()).toBeTruthy();
});
