import {createProductsSearchEndpointRequest} from 'bapi/endpoints/products';
import {execute} from 'bapi/helpers/execute';
import * as nock from 'nock';

nock('https://api-cloud.example.com/')
  .options(/.*/)
  .reply(200, '', {'access-control-allow-origin': '*'})
  .persist();

test('Fetch category products', async () => {
  nock('https://api-cloud.example.com/')
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(
      `/v1/products?filters%5Bcategory%5D=20201&sortScore=category_scores&sortChannel=etkp&perPage=2`,
    )
    // .query({ ... })
    .replyWithFile(200, __dirname + '/responses/products.json', {
      'Content-Type': 'application/json',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    createProductsSearchEndpointRequest({
      where: {
        categoryId: 20201,
      },
      pagination: {
        perPage: 2,
      },
      sort: {
        score: 'category_scores',
        channel: 'etkp',
      },
    }),
  );

  expect(result.data.entities.length).toBe(2);

  return true;
});
