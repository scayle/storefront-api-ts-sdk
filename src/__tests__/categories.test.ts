import {execute} from 'bapi/helpers/execute';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';
import {createCategoriesEndpointRequest} from 'bapi/endpoints/categories';

disableNetAndAllowBapiCors();

test('Fetch category by id', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(`/v1/categories?with=descendants&depth=2`)
    .replyWithFile(200, __dirname + '/responses/categories.json', {
      'Content-Type': 'application/json',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    139,
    createCategoriesEndpointRequest({
      with: {
        children: {
          depth: 1,
        },
      },
    }),
  );

  expect(result.data.length).toBe(3);
});
