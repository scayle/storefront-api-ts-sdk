import {RFC33339Date} from '../../..';
import {createPromotionsEndpointRequest} from '../promotions';

it('Builds correct query', () => {
  expect(createPromotionsEndpointRequest({})).toMatchInlineSnapshot(`
{
  "endpoint": "promotions",
  "method": "GET",
  "params": {},
}
`);

  expect(
    createPromotionsEndpointRequest({
      pagination: {
        page: 1,
        perPage: 50,
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "promotions",
  "method": "GET",
  "params": {
    "page": 1,
    "perPage": 50,
  },
}
`);

  expect(
    createPromotionsEndpointRequest({
      ids: ['abc', 'def'],
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "promotions",
  "method": "GET",
  "params": {
    "ids": "abc,def",
  },
}
`);

  expect(
    createPromotionsEndpointRequest({
      activeAt: '2023-10-22T19:54:02Z' as RFC33339Date,
    }),
  ).toMatchInlineSnapshot(`
{
  "endpoint": "promotions",
  "method": "GET",
  "params": {
    "activeAt": "2023-10-22T19:54:02Z",
  },
}
`);
});
