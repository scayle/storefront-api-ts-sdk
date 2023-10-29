import {it, expect} from 'vitest';
import {getParamsString} from '../../../helpers/execute';
import {createFiltersEndpointRequest} from '../filters';

it('build correct query', () => {
  expect(
    createFiltersEndpointRequest({
      where: {
        categoryId: 20201,
      },
    }),
  ).toMatchInlineSnapshot(`
  {
    "endpoint": "/v1/filters",
    "method": "GET",
    "params": {
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
    }),
  ).toMatchInlineSnapshot(`
  {
    "endpoint": "/v1/filters",
    "method": "GET",
    "params": {
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
    }),
  ).toMatchInlineSnapshot(`
  {
    "endpoint": "/v1/filters",
    "method": "GET",
    "params": {
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
      including: ['styleGroup'],
    }),
  ).toMatchInlineSnapshot(`
  {
    "endpoint": "/v1/filters",
    "method": "GET",
    "params": {
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
  {
    "endpoint": "/v1/filters",
    "method": "GET",
    "params": {
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
  {
    "endpoint": "/v1/filters",
    "method": "GET",
    "params": {
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
  {
    "endpoint": "/v1/filters",
    "method": "GET",
    "params": {
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
  {
    "endpoint": "/v1/filters",
    "method": "GET",
    "params": {
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
  ).toMatchInlineSnapshot(`"?with=values&campaignKey=foo&filters%5BhasCampaignReduction%5D=false"`);

  expect(
    getParamsString(
      createFiltersEndpointRequest({
        campaignKey: '92',
        where: {
          hasCampaignReduction: true,
        },
      }).params,
    ),
  ).toMatchInlineSnapshot(`"?with=values&campaignKey=92&filters%5BhasCampaignReduction%5D=true"`);

  expect(getParamsString(createFiltersEndpointRequest({campaignKey: '92'}).params)).toMatchInlineSnapshot(
    `"?with=values&campaignKey=92"`,
  );

  expect(
    getParamsString(
      createFiltersEndpointRequest({
        where: {
          attributes: [
            {
              type: 'attributes',
              key: 'attributeGroup1',
              values: ['foo'],
            },
            {
              type: 'attributes',
              key: 'attributeGroup2',
              values: ['bar'],
            },
            {
              type: 'attributes',
              key: 'attributeGroup3',
              values: ['foo', 'bar', 'baz'],
            },
          ],
        },
      }).params,
    ),
  ).toMatchInlineSnapshot(
    `"?with=values&filters%5BattributeGroup1%5D=foo&filters%5BattributeGroup2%5D=bar&filters%5BattributeGroup3%5D=foo%2Cbar%2Cbaz"`,
  );

  expect(
    getParamsString(
      createFiltersEndpointRequest({
        where: {
          attributes: [
            {
              type: 'attributes',
              key: 'attributeGroup1',
              values: ['foo'],
            },
            {
              type: 'attributes',
              key: 'attributeGroup2',
              values: ['bar'],
            },
            {
              type: 'attributes',
              key: 'attributeGroup3',
              values: ['foo', 'bar', 'baz'],
            },
          ],
        },
      }).params,
    ),
  ).toMatchInlineSnapshot(
    `"?with=values&filters%5BattributeGroup1%5D=foo&filters%5BattributeGroup2%5D=bar&filters%5BattributeGroup3%5D=foo%2Cbar%2Cbaz"`,
  );

  expect(
    getParamsString(
      createFiltersEndpointRequest({
        orFiltersOperator: ['attributeGroup1', 'attributeGroup2', 'attributeGroup3'],
      }).params,
    ),
  ).toMatchInlineSnapshot(`"?with=values&orFiltersOperator=attributeGroup1%2CattributeGroup2%2CattributeGroup3"`);
});
