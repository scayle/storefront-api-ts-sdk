import {productWithQueryParameterValues} from 'bapi/types/ProductWith';

it('Converts attribute filters', () => {
  expect(
    productWithQueryParameterValues({
      attributes: 'all',
    }).join(','),
  ).toMatchInlineSnapshot(`"attributes"`);

  expect(
    productWithQueryParameterValues({
      attributes: {
        withKey: ['singleKey'],
      },
    }).join(','),
  ).toMatchInlineSnapshot(`"attributes:key(singleKey)"`);

  expect(
    productWithQueryParameterValues({
      attributes: {
        withKey: ['keyA', 'keyB'],
      },
    }).join(','),
  ).toMatchInlineSnapshot(`"attributes:key(keyA|keyB)"`);

  expect(
    productWithQueryParameterValues({
      attributes: {
        ofType: ['type1', 'type2'],
      },
    }).join(','),
  ).toMatchInlineSnapshot(`"attributes:type(type1|type2)"`);
});

it('Converts image filters', () => {
  // empty, because images are included by default
  expect(
    productWithQueryParameterValues({
      images: 'all',
    }).join(','),
  ).toMatchInlineSnapshot(`""`);

  expect(
    productWithQueryParameterValues({
      images: {
        attributes: {
          legacy: false,
        },
      },
    }).join(','),
  ).toMatchInlineSnapshot(`"images.attributes:legacy(false)"`);

  expect(
    productWithQueryParameterValues({
      images: {
        attributes: {
          legacy: false,
          withKey: ['singleKey'],
        },
      },
    }).join(','),
  ).toMatchInlineSnapshot(`"images.attributes:legacy(false):key(singleKey)"`);

  expect(
    productWithQueryParameterValues({
      images: {
        attributes: {
          legacy: false,
          withKey: ['keyA', 'keyB'],
        },
      },
    }).join(','),
  ).toMatchInlineSnapshot(`"images.attributes:legacy(false):key(keyA|keyB)"`);
});

it('Converts category filters', () => {
  expect(
    productWithQueryParameterValues({
      categories: 'all',
    }).join(','),
  ).toMatchInlineSnapshot(`"categories"`);
});

it('Converts sibling filters', () => {
  expect(
    productWithQueryParameterValues({
      siblings: 'all',
    }).join(','),
  ).toMatchInlineSnapshot(`"siblings"`);

  expect(
    productWithQueryParameterValues({
      siblings: {
        attributes: 'all',
        categories: 'all',
      },
    }).join(','),
  ).toMatchInlineSnapshot(`"siblings,siblings.attributes,siblings.categories"`);
});

it('Converts variant filters', () => {
  expect(
    productWithQueryParameterValues({
      variants: 'all',
    }).join(','),
  ).toMatchInlineSnapshot(`"variants"`);

  expect(
    productWithQueryParameterValues({
      variants: {
        attributes: 'all',
      },
    }).join(','),
  ).toMatchInlineSnapshot(`"variants,variants.attributes"`);

  expect(
    productWithQueryParameterValues({
      variants: {
        attributes: {
          withKey: ['keyA'],
        },
      },
    }).join(','),
  ).toMatchInlineSnapshot(`"variants,variants.attributes:key(keyA)"`);
});
