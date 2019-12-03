import {AttributeKey} from 'bapi/types/AttributeOrAttributeValueFilter';
import {queryParamsFromProductSearchQuery} from 'bapi/types/ProductSearchQuery';

it('Converts search query', () => {
  expect(queryParamsFromProductSearchQuery(undefined)).toEqual(undefined);

  expect(queryParamsFromProductSearchQuery({})).toMatchInlineSnapshot(
    `Object {}`,
  );

  // Leave some but not all values blank
  expect(queryParamsFromProductSearchQuery({categoryId: 1234}))
    .toMatchInlineSnapshot(`
Object {
  "filters[category]": 1234,
}
`);

  expect(
    queryParamsFromProductSearchQuery({
      categoryId: 1235,
      attributes: [
        {
          type: 'attributes',
          key: 'emptyAttribute' as AttributeKey,
          values: [],
        },
        {
          type: 'attributes',
          key: 'singleValue' as AttributeKey,
          values: [1],
        },
        {
          type: 'attributes',
          key: 'listAttributes' as AttributeKey,
          values: [1, 2, 3],
        },
        {
          type: 'boolean',
          key: 'on' as AttributeKey,
          value: true,
        },
        {
          type: 'boolean',
          key: 'off' as AttributeKey,
          value: false,
        },
      ],
      maxPrice: 1999,
      minPrice: 1,
      term: 'search term',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "filters[category]": 1235,
  "filters[emptyAttribute]": "",
  "filters[listAttributes]": "1,2,3",
  "filters[maxPrice]": 1999,
  "filters[minPrice]": 1,
  "filters[off]": "false",
  "filters[on]": "true",
  "filters[singleValue]": "1",
  "filters[term]": "search term",
}
`);
});
