import {createCategoryByIdEndpointRequest} from 'bapi/endpoints/categoryById';
import {execute} from 'bapi/helpers/execute';
import * as nock from 'nock';

nock.disableNetConnect();

test('Fetch category by id', async () => {
  nock('https://api-cloud.example.com/')
    .options(/.*/)
    .reply(200, '', {'access-control-allow-origin': '*'})
    .persist();

  nock('https://api-cloud.example.com/')
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(`/v1/categories/20202`)
    .replyWithFile(200, __dirname + '/responses/categoryById.json', {
      'Content-Type': 'application/json',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    createCategoryByIdEndpointRequest({
      categoryId: 20202,
    }),
  );

  expect(result.data.id).toBe(20202);
});
