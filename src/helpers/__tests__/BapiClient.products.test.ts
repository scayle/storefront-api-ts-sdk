import {BapiClient} from 'bapi/helpers/BapiClient';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';

disableNetAndAllowBapiCors();

it('Gets product by ID', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/products/4001039')
    .query({shopId: 139})
    .replyWithFile(
      200,
      __dirname + '/responses/products/single.json' /* TODO */,
      {
        'Content-Type': 'application/json',
      },
    );

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'query',
  });

  const response = await bapi.products.getById(4001039);

  expect(response.id).toBe(4001039);
});

it('Gets products by IDs', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/products?ids=4001039%2C4001029&shopId=139')
    .replyWithFile(200, __dirname + '/responses/products/byIds.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'query',
  });

  const response = await bapi.products.getByIds([4001039, 4001029]);

  expect(response.length).toBe(2);
});

it('Queries products', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(
      '/v1/products?with=attributes%2Cimages.attributes%3Alegacy%28false%29&perPage=3&shopId=139',
    )
    .replyWithFile(200, __dirname + '/responses/products/query.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'query',
  });

  const response = await bapi.products.query({
    with: {attributes: 'all'},
    pagination: {perPage: 3},
  });

  expect(response.entities.length).toBe(3);
});

it('Queries products with price range', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(
      '/v1/products/3849870?with=images.attributes%3Alegacy%28false%29%2CpriceRange&shopId=139',
    )
    .replyWithFile(
      200,
      __dirname + '/responses/products/productWithPriceRange.json',
      {
        'Content-Type': 'application/json',
      },
    );

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'query',
  });

  const response = await bapi.products.getById(3849870, {
    with: {priceRange: true},
  });

  expect(response.id).toBe(3849870);

  if (!response.priceRange) {
    fail('Expected price range on response');
    return;
  }

  expect(response.priceRange.min.withTax).toBe(4990);
  expect(response.priceRange.max.withTax).toBe(7999);
});
