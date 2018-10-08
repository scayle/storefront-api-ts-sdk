import {createCategoryBySlugEndpointRequest} from 'bapi/endpoints/categoryBySlug';
import {execute} from 'bapi/helpers/execute';
import * as nock from 'nock';

nock.disableNetConnect();

nock('https://api-cloud.example.com/')
  .options(/.*/)
  .reply(200, '', {'access-control-allow-origin': '*'})
  .persist();

test('Fetch category by id', async () => {
  nock('https://api-cloud.example.com/')
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(`/v1/categories/frauen/bekleidung/jeans/slim-fit`)
    .query({
      with: 'descendants',
      depth: '2',
    })
    .replyWithFile(200, __dirname + '/responses/categoryBySlug.json', {
      'Content-Type': 'application/json',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
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
