import { createFiltersEndpointRequest } from '../filters'

describe('filters request', () => {
  /** from 'src/__tests__/filters.test.ts'; BEGIN */

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
  `)

    expect(
      createFiltersEndpointRequest({
        where: {
          categoryId: 20201,
        },
        with: [],
      }),
    ).toMatchInlineSnapshot(`
  {
    "endpoint": "/v1/filters",
    "method": "GET",
    "params": {
      "filters[category]": 20201,
    },
  }
  `)

    expect(
      createFiltersEndpointRequest({
        where: {
          categoryId: 20201,
        },
        with: ['values', 'category_ids'],
      }),
    ).toMatchInlineSnapshot(`
  {
    "endpoint": "/v1/filters",
    "method": "GET",
    "params": {
      "filters[category]": 20201,
      "with": "values,category_ids",
    },
  }
  `)

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
  `)

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
  `)

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
  `)

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
  `)

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
  `)
  })
})
