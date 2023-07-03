import {createFiltersEndpointRequest} from '../endpoints/filters/filters';
import {execute, getParamsString} from '../helpers/execute';
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

  expect(
    createFiltersEndpointRequest({
      where: {
        categoryId: 20201,
      },
      including: ['styleGroup'],
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "filters",
  "method": "GET",
  "params": Object {
    "filters[category]": 20201,
    "including": "styleGroup",
    "with": "values",
  },
}
`);

  expect(
    createFiltersEndpointRequest({
      where: {
        categoryId: 20201,
      },
      including: ['styleGroup', 'isNew'],
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "filters",
  "method": "GET",
  "params": Object {
    "filters[category]": 20201,
    "including": "styleGroup,isNew",
    "with": "values",
  },
}
`);

  expect(
    createFiltersEndpointRequest({
      where: {
        categoryId: 20201,
      },
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "filters",
  "method": "GET",
  "params": Object {
    "campaignKey": "px",
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
      campaignKey: 'some-other-campaign',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "filters",
  "method": "GET",
  "params": Object {
    "campaignKey": "some-other-campaign",
    "filters[category]": 20201,
    "with": "values",
  },
}
`);

  expect(
    createFiltersEndpointRequest({
      where: {
        hasCampaignReduction: true,
      },
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "filters",
  "method": "GET",
  "params": Object {
    "campaignKey": "px",
    "filters[hasCampaignReduction]": "true",
    "with": "values",
  },
}
`);

  expect(
    getParamsString(
      createFiltersEndpointRequest({
        campaignKey: 'foo',
        where: {
          hasCampaignReduction: false,
        },
      }).params,
    ),
  ).toMatchInlineSnapshot(
    `"?with=values&campaignKey=foo&filters%5BhasCampaignReduction%5D=false"`,
  );

  expect(
    getParamsString(
      createFiltersEndpointRequest({
        campaignKey: '92',
        where: {
          hasCampaignReduction: true,
        },
      }).params,
    ),
  ).toMatchInlineSnapshot(
    `"?with=values&campaignKey=92&filters%5BhasCampaignReduction%5D=true"`,
  );

  expect(
    getParamsString(
      createFiltersEndpointRequest({campaignKey: '92', where: {}}).params,
    ),
  ).toMatchInlineSnapshot(`"?with=values&campaignKey=92"`);
});
