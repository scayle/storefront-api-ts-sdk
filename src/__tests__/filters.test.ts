import {createFiltersEndpointRequest} from 'bapi/endpoints/filters';
import {execute} from 'bapi/helpers/execute';
import * as nock from 'nock';
nock.disableNetConnect();

nock('https://api-cloud.example.com/')
  .options(/.*/)
  .reply(200, '', {'access-control-allow-origin': '*'})
  .persist();

test('Fetch filters for category; expect standard attributes', async () => {
  nock('https://api-cloud.example.com/')
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(`/v1/filters?with=values&filters%5Bcategory%5D=20201`)
    // .query({
    //   with: 'values',
    //   'filters[category]': '20201',
    // })
    .replyWithFile(200, __dirname + '/responses/filters.json', {
      'Content-Type': 'application/json',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    createFiltersEndpointRequest({
      where: {
        categoryId: 20201,
      },
    }),
  );

  const expectedAttributes = [
    'prices',
    'sale',
    'brand',
    'categoryShopFilterSizes',
  ];

  for (const expectedAttribute of expectedAttributes) {
    expect(result.data.some(filter => filter.slug === expectedAttribute)).toBe(
      true,
    );
  }
});
