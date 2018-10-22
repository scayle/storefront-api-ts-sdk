import {createCategoryByIdEndpointRequest} from 'bapi/endpoints/categoryById';
import {execute} from 'bapi/helpers/execute';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';

disableNetAndAllowBapiCors();

test('Fetch category by id', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(`/v1/categories/20202?depth=1`)
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
});
