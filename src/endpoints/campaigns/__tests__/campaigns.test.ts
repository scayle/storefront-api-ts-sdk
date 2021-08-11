import {CampaignSortOption, createCampaignsEndpointRequest} from '../campaigns';
import {APISortOrder} from 'bapi/endpoints/products/products';

it('builds correct endpoint request with no arguments', () => {
  expect(createCampaignsEndpointRequest()).toMatchInlineSnapshot(`
Object {
  "endpoint": "campaigns",
  "method": "GET",
  "params": Object {},
}
`);
});

it('builds correct endpoint request with single sort option', () => {
  expect(
    createCampaignsEndpointRequest({
      sort: {
        by: CampaignSortOption.EndAt,
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "campaigns",
  "method": "GET",
  "params": Object {
    "sort": "end_at",
  },
}
`);
});

it('builds correct endpoint request with sort options', () => {
  expect(
    createCampaignsEndpointRequest({
      sort: {
        by: CampaignSortOption.Id,
        direction: APISortOrder.Ascending,
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "campaigns",
  "method": "GET",
  "params": Object {
    "sort": "id",
    "sortDir": "asc",
  },
}
`);
});

it('builds correct endpoint request with pagination', () => {
  expect(
    createCampaignsEndpointRequest({
      pagination: {
        page: 3,
        perPage: 5,
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "campaigns",
  "method": "GET",
  "params": Object {
    "page": 3,
    "perPage": 5,
  },
}
`);
});

it('builds correct endpoint request with sort options and pagination', () => {
  expect(
    createCampaignsEndpointRequest({
      sort: {
        by: CampaignSortOption.Id,
        direction: APISortOrder.Ascending,
      },
      pagination: {
        page: 6,
        perPage: 13,
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "campaigns",
  "method": "GET",
  "params": Object {
    "page": 6,
    "perPage": 13,
    "sort": "id",
    "sortDir": "asc",
  },
}
`);
});
