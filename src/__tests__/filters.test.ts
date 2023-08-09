import {createFiltersEndpointRequest} from '../endpoints/filters/filters';
import {execute} from '../helpers/execute';
import {
  disableNetAndAllowBapiCors,
  nockWithBapiScope,
} from '../test-helpers/nock';

disableNetAndAllowBapiCors();

test.skip('Fetch filters for category; expect standard attributes', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(`/v1/filters?with=values&filters%5Bcategory%5D=20201&shopId=139`)
    // .query({
    //   with: 'values',
    //   'filters[category]': '20201',
    // })
    .replyWithFile(200, __dirname + '/responses/filters.json', {
      'Content-Type': 'application/json',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    139,
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
