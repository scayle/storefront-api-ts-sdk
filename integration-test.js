const bapi = require('./dist');

async function testBasketUpdate() {
  const client = new bapi.BapiClient({
    host: 'https://api-cloud.aboutyou.de/v1/',
    shopId: 139,
    auth: {
      username: 'shop',
      password: 'XBdNa5jgBPb7vsDj',
    },
  });

  // console.log(client.env);
  // // console.log(await client.filters.getValues('color', {}));

  const basketKey = 'mop_test_ppk_5';
  const testVariant = 45282016;

  console.log('Initial basket');

  console.log(await client.basket.get(basketKey));

  console.log('Initial add');

  console.log(
    (
      await client.basket.addOrUpdateItems(
        basketKey,
        [
          {
            variantId: testVariant,
            quantity: 1,
            params: {
              customData: {
                // testField: 'yes',
              },
              pricePromotionKey: 'test-ppk',
            },
          },
        ],
        {},
      )
    ).basket.items[0],
  );

  console.log('Update call');

  console.log(
    (
      await client.basket.addOrUpdateItems(
        basketKey,
        [
          {
            variantId: testVariant,
            quantity: 13 /* final quantity */,
            params: {
              // pricePromotionKey: 'test-ppk',
            },
          },
        ],
        {},
        {
          existingItemHandling: bapi.ExistingItemHandling.ReplaceExisting,
        },
      )
    ).basket.items[0],
  );

  // 41568036
}

testBasketUpdate();
