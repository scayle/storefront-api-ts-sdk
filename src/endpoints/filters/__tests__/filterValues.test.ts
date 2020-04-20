import {createFilterValuesEndpointRequest} from '../filterValues';

it('builds correct endpoint request', () => {
  expect(
    createFilterValuesEndpointRequest({
      groupName: 'brands',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "filters/brands/values",
  "method": "GET",
  "params": Object {},
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
Object {
  "endpoint": "filters/brands/values",
  "method": "GET",
  "params": Object {
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
Object {
  "endpoint": "filters/brands/values",
  "method": "GET",
  "params": Object {
    "filters[category]": 20201,
  },
}
`);
});
