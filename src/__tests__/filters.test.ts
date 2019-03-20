import {createFiltersEndpointRequest} from 'bapi/endpoints/filters/filters';
import {execute} from 'bapi/helpers/execute';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';

disableNetAndAllowBapiCors();

test('Fetch filters for category; expect standard attributes', async () => {
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

test('Filters request', async () => {
  expect(
    createFiltersEndpointRequest({
      where: {
        categoryId: 20201,
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "filters",
  "method": "GET",
  "params": Object {
    "filters[category]": 20201,
    "with": "values",
  },
}
`);

  expect(
    createFiltersEndpointRequest({
      where: {
        categoryId: 20201,
      },
      with: [],
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "filters",
  "method": "GET",
  "params": Object {
    "filters[category]": 20201,
    "with": "",
  },
}
`);

  expect(
    createFiltersEndpointRequest({
      where: {
        categoryId: 20201,
      },
      with: ['values', 'category_ids'],
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "filters",
  "method": "GET",
  "params": Object {
    "filters[category]": 20201,
    "with": "values,category_ids",
  },
}
`);
});
