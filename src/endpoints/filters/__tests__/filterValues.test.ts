import {it, expect} from 'vitest';
import {createFilterValuesEndpointRequest} from '../filterValues';

it('builds correct endpoint request', () => {
  expect(
    createFilterValuesEndpointRequest({
      groupName: 'brands',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/filters/brands/values",
  "method": "GET",
  "params": {},
}
`);
});

it('adds the campaignKey to the request params', () => {
  expect(
    createFilterValuesEndpointRequest({
      groupName: 'brands',
      campaignKey: 'px',
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/filters/brands/values",
  "method": "GET",
  "params": {
    "campaignKey": "px",
  },
}
`);
});

it('adds any product filter query param to the request', () => {
  expect(
    createFilterValuesEndpointRequest({
      groupName: 'brands',
      where: {
        categoryId: 20201,
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/filters/brands/values",
  "method": "GET",
  "params": {
    "filters[category]": 20201,
  },
}
`);
});
