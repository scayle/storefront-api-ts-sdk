import {BapiClient} from 'bapi/helpers/BapiClient';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';

disableNetAndAllowBapiCors({shopIdHeader: true});

it('Get basket', async () => {
  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/baskets/customer_2137901')
    .replyWithFile(200, __dirname + '/responses/getBasket.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'header',
  });

  const basketKey = 'customer_2137901';

  const basketResponse = await bapi.basket.get(basketKey);

  if (basketResponse.type !== 'success') {
    fail('Expected success response');
  }

  expect(basketResponse.basket).toHaveProperty(`cost`);
});

it('Get basket with error', async () => {
  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/baskets/customer_2137901')
    .reply(
      500,
      {},
      {
        'Content-Type': 'application/json',
      },
    );

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'header',
  });

  const basketKey = 'customer_2137901';

  const basketResponse = await bapi.basket.get(basketKey);

  if (basketResponse.type !== 'failure') {
    fail('Expected failure response');
  }
});

it('Basket: Add same variant twice', async () => {
  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'header',
  });

  const basketKey = 'customer_2137901';

  nockWithBapiScope({shopIdHeader: true})
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

  nockWithBapiScope({shopIdHeader: true})
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

it('Basket: Add variant failure 1', async () => {
  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'header',
  });

  const basketKey = 'customer_2137901';

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .post('/v1/baskets/customer_2137901/items', {
      variantId: 35149152,
      quantity: 1,
    })
    .reply(
      206,
      {},
      {
        'Content-Type': 'application/json',
      },
    );

  const response = await bapi.basket.addItem(basketKey, 35149152);

  expect(response.type).toBe('failure');
});

it('Basket: Add variant failure 1', async () => {
  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'header',
  });

  const basketKey = 'customer_2137901';

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .post('/v1/baskets/customer_2137901/items', {
      variantId: 35149152,
      quantity: 1,
    })
    .reply(
      424,
      {},
      {
        'Content-Type': 'application/json',
      },
    );

  const response = await bapi.basket.addItem(basketKey, 35149152);

  expect(response.type).toBe('failure');
});

it('Basket: Add variant failure 1', async () => {
  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'header',
  });

  const basketKey = 'customer_2137901';

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .post('/v1/baskets/customer_2137901/items', {
      variantId: 35149152,
      quantity: 1,
    })
    .reply(
      409,
      {},
      {
        'Content-Type': 'application/json',
      },
    );

  const response = await bapi.basket.addItem(basketKey, 35149152);

  expect(response.type).toBe('failure');
});

it('Basket: Add variant failure 1', async () => {
  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'header',
  });

  const basketKey = 'customer_2137901';

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .post('/v1/baskets/customer_2137901/items', {
      variantId: 35149152,
      quantity: 1,
    })
    .reply(
      412,
      {},
      {
        'Content-Type': 'application/json',
      },
    );

  const response = await bapi.basket.addItem(basketKey, 35149152);

  expect(response.type).toBe('failure');
});

it('Basket: Add variant failure 1', async () => {
  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'header',
  });

  const basketKey = 'customer_2137901';

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .post('/v1/baskets/customer_2137901/items', {
      variantId: 35149152,
      quantity: 1,
    })
    .reply(
      413,
      {},
      {
        'Content-Type': 'application/json',
      },
    );

  const response = await bapi.basket.addItem(basketKey, 35149152);

  expect(response.type).toBe('failure');
});

it('Basket: Add variant failure 1', async () => {
  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'header',
  });

  const basketKey = 'customer_2137901';

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .post('/v1/baskets/customer_2137901/items', {
      variantId: 35149152,
      quantity: 1,
    })
    .reply(
      400,
      {},
      {
        'Content-Type': 'application/json',
      },
    );

  const response = await bapi.basket.addItem(basketKey, 35149152);

  expect(response.type).toBe('failure');
});

it('Basket: Add same variant twice', async () => {
  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'header',
  });

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .delete('/v1/baskets/basket_1/items/item_1')
    .replyWithFile(200, __dirname + '/responses/firstAddToBasket.json', {
      'Content-Type': 'application/json',
    });

  const deleteItemResponse = await bapi.basket.deleteItem('basket_1', 'item_1');

  expect(deleteItemResponse.items.length).toBe(1);
});

it('Basket: Update item quantity', async () => {
  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'header',
  });

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .patch('/v1/baskets/basket_1/items/item_1', {
      quantity: 5,
    })
    .replyWithFile(200, __dirname + '/responses/firstAddToBasket.json', {
      'Content-Type': 'application/json',
    });

  const deleteItemResponse = await bapi.basket.updateItem(
    'basket_1',
    'item_1',
    5,
  );

  expect(deleteItemResponse.type).toBe('success');
});

it('Basket: Update item failure', async () => {
  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'header',
  });

  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .patch('/v1/baskets/basket_1/items/item_1', {
      quantity: 5,
    })
    .reply(
      500,
      {},
      {
        'Content-Type': 'application/json',
      },
    );

  const deleteItemResponse = await bapi.basket.updateItem(
    'basket_1',
    'item_1',
    5,
  );

  expect(deleteItemResponse.type).toBe('failure');
});
