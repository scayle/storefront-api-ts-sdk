import {
  createProductsSearchEndpointRequest,
  APISortOption,
  APISortOrder,
} from '../products';
import {AttributeKey} from 'bapi/types/AttributeOrAttributeValueFilter';
import {getParamsString} from 'bapi/helpers/execute';
import {queryParamsFromProductSearchQuery} from 'bapi/types/ProductSearchQuery';

it('Builds correct query', () => {
  expect(
    createProductsSearchEndpointRequest({
      with: {
        categories: 'all',
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "with": "images.attributes:legacy(false),categories:properties()",
  },
}
`);

  expect(
    createProductsSearchEndpointRequest({
      with: {
        categories: {
          properties: 'all',
        },
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "with": "images.attributes:legacy(false),categories",
  },
}
`);

  expect(
    createProductsSearchEndpointRequest({
      sort: {
        by: APISortOption.DateAdded,
        channel: 'size',
        direction: APISortOrder.Descending,
        score: 'category_scores',
      },
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "campaignKey": "px",
    "sort": "new",
    "sortChannel": "size",
    "sortDir": "desc",
    "sortScore": "category_scores",
  },
}
`);

  expect(
    createProductsSearchEndpointRequest({
      campaignKey: 'some-other-campaign',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "campaignKey": "some-other-campaign",
  },
}
`);

  expect(
    createProductsSearchEndpointRequest({
      pagination: {
        page: 1,
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "page": 1,
  },
}
`);

  expect(
    createProductsSearchEndpointRequest({
      sort: {
        sortingKey: 'custom_sort_order',
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "sortingKey": "custom_sort_order",
  },
}
`);

  expect(
    createProductsSearchEndpointRequest({
      includeSellableForFree: true,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "includeSellableForFree": true,
  },
}
`);

  expect(
    createProductsSearchEndpointRequest({
      includeSoldOut: true,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "includeSoldOut": true,
  },
}
`);

  expect(
    createProductsSearchEndpointRequest({
      includeSoldOut: true,
      includeSellableForFree: true,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "includeSellableForFree": true,
    "includeSoldOut": true,
  },
}
`);

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
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "filters[brand]": "271,567",
    "pricePromotionKey": "abc123",
  },
}
`);

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
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "filters[1]": "1,2",
  },
}
`);

  expect(
    createProductsSearchEndpointRequest({
      minProductId: 123456,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "minProductId": 123456,
  },
}
`);

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
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "filters[ean]": "7325860037489",
  },
}
`);

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
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "filters[minfirstLiveAt]": "2020-11-27",
  },
}
`);

  expect(
    getParamsString(
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
      }).params,
    ),
  ).toMatchInlineSnapshot(`"?filters%5BminfirstLiveAt%5D=2020-11-27"`);

  expect(
    queryParamsFromProductSearchQuery({
      hasCampaignReduction: true,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "filters[hasCampaignReduction]": "true",
}
`);

  expect(
    createProductsSearchEndpointRequest({
      campaignKey: 'px',
      where: {
        hasCampaignReduction: true,
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "campaignKey": "px",
    "filters[hasCampaignReduction]": "true",
  },
}
`);

  expect(
    getParamsString(
      createProductsSearchEndpointRequest({
        campaignKey: 'px',
        where: {
          hasCampaignReduction: true,
        },
      }).params,
    ),
  ).toMatchInlineSnapshot(
    `"?filters%5BhasCampaignReduction%5D=true&campaignKey=px"`,
  );

  expect(
    getParamsString(
      createProductsSearchEndpointRequest({
        campaignKey: 'px',
        where: {
          hasCampaignReduction: false,
        },
      }).params,
    ),
  ).toMatchInlineSnapshot(
    `"?filters%5BhasCampaignReduction%5D=false&campaignKey=px"`,
  );

  expect(
    getParamsString(
      createProductsSearchEndpointRequest({
        campaignKey: 'px',
      }).params,
    ),
  ).toMatchInlineSnapshot(`"?campaignKey=px"`);
});
