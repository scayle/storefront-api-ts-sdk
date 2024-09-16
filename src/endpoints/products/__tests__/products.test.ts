import { createProductsSearchEndpointRequest } from '../products'
import type { AttributeKey } from '../../../types/AttributeOrAttributeValueFilter'
import { queryParamsFromProductSearchQuery } from '../../../types/ProductSearchQuery'
import { ProductStandardSorting, SortOrder } from '../../../types/Sorting'

it('builds correct query', () => {
  expect(
    createProductsSearchEndpointRequest({
      with: {
        categories: 'all',
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "with": "images.attributes:legacy(false),categories,categories:properties()",
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      with: {
        categories: {
          properties: 'all',
        },
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "with": "images.attributes:legacy(false),categories",
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      sort: {
        by: ProductStandardSorting.DateAdded,
        channel: 'size',
        direction: SortOrder.Descending,
        score: 'category_scores',
      },
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "campaignKey": "px",
    "sort": "new",
    "sortChannel": "size",
    "sortDir": "desc",
    "sortScore": "category_scores",
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      campaignKey: 'some-other-campaign',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "campaignKey": "some-other-campaign",
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      pagination: {
        page: 1,
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "page": 1,
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      sort: {
        sortingKey: 'custom_sort_order',
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "sortingKey": "custom_sort_order",
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      sort: {
        sortingKey: ['sortingKey1', 'sortingKey2'],
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "sortingKey": "sortingKey1,sortingKey2",
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      includeSellableForFree: true,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "includeSellableForFree": true,
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      includeSoldOut: true,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "includeSoldOut": true,
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      includeSoldOut: true,
      includeSellableForFree: true,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "includeSellableForFree": true,
    "includeSoldOut": true,
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      pricePromotionKey: 'abc123',
      where: {
        attributes: [
          {
            type: 'attributes',
            key: 'brand' as AttributeKey,
            values: [271, 567],
          },
        ],
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "filters[brand]": "271,567",
    "pricePromotionKey": "abc123",
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      where: {
        attributes: [
          {
            type: 'attributes',
            id: 1,
            values: [1, 2],
          },
        ],
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "filters[1]": "1,2",
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      minProductId: 123456,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "minProductId": 123456,
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      where: {
        attributes: [
          {
            type: 'attributes',
            key: 'ean' as AttributeKey,
            values: ['7325860037489'],
          },
        ],
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "filters[ean]": "7325860037489",
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      where: {
        attributes: [
          {
            type: 'attributes',
            key: 'minfirstLiveAt' as AttributeKey,
            values: ['2020-11-27'],
          },
        ],
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "filters[minfirstLiveAt]": "2020-11-27",
  },
}
`)

  expect(
    queryParamsFromProductSearchQuery({
      hasCampaignReduction: true,
    }),
  ).toMatchInlineSnapshot(`
{
  "filters[hasCampaignReduction]": "true",
}
`)

  expect(
    createProductsSearchEndpointRequest({
      campaignKey: 'px',
      where: {
        hasCampaignReduction: true,
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "campaignKey": "px",
    "filters[hasCampaignReduction]": "true",
  },
}
`)

  expect(
    createProductsSearchEndpointRequest({
      trackSearchAnalyticsEvent: false,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {},
}
`)

  expect(
    createProductsSearchEndpointRequest({
      trackSearchAnalyticsEvent: true,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/products",
  "method": "GET",
  "params": {
    "trackSearchAnalyticsEvent": "true",
  },
}
`)
})
