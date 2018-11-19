import {createCategoryBySlugEndpointRequest} from 'bapi/endpoints/categories/categoryBySlug';
import {execute} from 'bapi/helpers/execute';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';

disableNetAndAllowBapiCors();

test('Fetch category by id', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(`/v1/categories/frauen/bekleidung/jeans/slim-fit`)
    .query({
      with: 'descendants',
      depth: '2',
      shopId: 139,
    })
    .replyWithFile(200, __dirname + '/responses/categoryBySlug.json', {
      'Content-Type': 'application/json',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    139,
    createCategoryBySlugEndpointRequest({
      slugPath: ['frauen', 'bekleidung', 'jeans', 'slim-fit'],
      with: {
        children: {depth: 1},
      },
    }),
  );

  expect(result.data.children).toBeTruthy();
  expect(result.data.children!.length).toEqual(3);
});
