import {BapiClient} from 'bapi/helpers/BapiClient';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';

disableNetAndAllowBapiCors();

it('Gets category by ID', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/categories/20201')
    .query({shopId: 139, depth: 1})
    .replyWithFile(200, __dirname + '/responses/categories/byId.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'query',
  });

  const response = await bapi.categories.getById(20201);

  expect(response.id).toBe(20201);
});

it('Gets categories by IDs', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/categories')
    .query({shopId: 139, ids: '20201,20204', depth: 1})
    .replyWithFile(200, __dirname + '/responses/categories/byIds.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'query',
  });

  const response = await bapi.categories.getByIds([20201, 20204]);

  expect(response.length).toBe(2);
});

it('Gets categories by ID (including hidden)', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/categories/20201')
    .query({shopId: 139, depth: 1, showHidden: 'true'})
    .replyWithFile(200, __dirname + '/responses/categories/byId.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'query',
  });

  const response = await bapi.categories.getById(20201, {
    includeHidden: true,
  });

  expect(response.id).toBe(20201);
});

it('Gets category by path', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/categories/frauen/bekleidung')
    .query({shopId: 139, depth: 1})
    .replyWithFile(200, __dirname + '/responses/categories/byPath.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'query',
  });

  const response = await bapi.categories.getByPath(['frauen', 'bekleidung']);

  expect(response.id).toBe(20204);
});

it('Gets root categories wishlist', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/categories')
    .query({shopId: 139, depth: 1})
    .replyWithFile(200, __dirname + '/responses/categories/roots.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new BapiClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
    shopIdPlacement: 'query',
  });

  const response = await bapi.categories.getRoots();

  expect(response.length).toBe(3);
});
