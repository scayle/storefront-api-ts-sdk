import {createSearchResolveEndpointRequest, SearchResolveEndpointResponseData} from '../resolve';

it('Builds correct query', () => {
  expect(createSearchResolveEndpointRequest({term: 'maxi rot'})).toMatchInlineSnapshot(`
{
  "endpoint": "/v1/search/resolve",
  "method": "GET",
  "params": {
    "term": "maxi rot",
  },
}
`);
});

it('Maps response correctly', () => {
  const response: SearchResolveEndpointResponseData = {
    matches: [
      {
        count: 1,
        match: 'Maxi rot',
        category: {
          match: 'Maxi',
          id: 500913,
          name: 'Maxi',
        },
        attributes: [
          {
            match: 'rot',
            name: 'color',
            attributeGroup: 1,
            attributeId: 38931,
          },
          {
            match: 'kobaltblau',
            name: 'colorDetail',
            attributeGroup: 210,
            attributeId: 38753,
          },
        ],
      },
    ],
  };

  expect(response).toBeTruthy();
});
