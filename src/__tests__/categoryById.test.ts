import {createCategoryByIdEndpointRequest} from 'bapi/endpoints/categories/categoryById';
import {execute} from 'bapi/helpers/execute';
import {
  disableNetAndAllowBapiCors,
  nockWithBapiScope,
} from 'bapi/test-helpers/nock';

disableNetAndAllowBapiCors();

test('Fetch category by id', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(`/v1/categories/20202`)
    .query({
      depth: 1,
      shopId: 139,
      with: 'properties:name()',
    })
    .replyWithFile(200, __dirname + '/responses/categoryById.json', {
      'Content-Type': 'application/json',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    139,
    createCategoryByIdEndpointRequest({
      categoryId: 20202,
    }),
  );

  expect(result.data.id).toBe(20202);
  expect(result.data.supportedFilter).toBeDefined();
  expect(result.data.supportedFilter![0]).toBe('mainMaterial');
});
