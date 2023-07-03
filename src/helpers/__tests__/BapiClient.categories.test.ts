import {StorefrontAPIClient} from '../../BapiClient';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from '../../test-helpers/nock';

disableNetAndAllowBapiCors();

it.skip('Gets category by ID', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/categories/20201')
    .query({shopId: 139, depth: 1, with: 'properties:name()'})
    .replyWithFile(200, __dirname + '/responses/categories/byId.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const response = await bapi.categories.getById(20201);

  expect(response.id).toBe(20201);
});

it.skip('Gets categories by IDs', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/categories')
    .query({
      shopId: 139,
      ids: '20201,20204',
      depth: 1,
      with: 'properties:name()',
    })
    .replyWithFile(200, __dirname + '/responses/categories/byIds.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const response = await bapi.categories.getByIds([20201, 20204]);

  expect(response.length).toBe(2);
});

it.skip('Gets categories by ID (including hidden)', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/categories/20201')
    .query({
      shopId: 139,
      depth: 1,
      showHidden: 'true',
      with: 'properties:name()',
    })
    .replyWithFile(200, __dirname + '/responses/categories/byId.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const response = await bapi.categories.getById(20201, {
    includeHidden: true,
  });

  expect(response.id).toBe(20201);
});

it.skip('Gets category by path', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/categories/frauen/bekleidung')
    .query({shopId: 139, depth: 1, with: 'properties:name()'})
    .replyWithFile(200, __dirname + '/responses/categories/byPath.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const response = await bapi.categories.getByPath(['frauen', 'bekleidung']);

  expect(response.id).toBe(20204);
});

it.skip('Gets root categories', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/categories')
    .query({shopId: 139, depth: 1, with: 'properties:name()'})
    .replyWithFile(200, __dirname + '/responses/categories/roots.json', {
      'Content-Type': 'application/json',
    });

  const bapi = new StorefrontAPIClient({
    host: 'https://api-cloud.example.com/v1/',
    shopId: 139,
  });

  const response = await bapi.categories.getRoots();

  expect(response.length).toBe(3);
});
