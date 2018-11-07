import {productWithQueryParameterValues} from 'bapi/types/ProductWith';

it('Converts attribute filters', () => {
  expect(
    productWithQueryParameterValues({
      attributes: 'all',
    }).join(','),
  ).toMatchInlineSnapshot(`"attributes,images.attributes:legacy(false)"`);

  expect(
    productWithQueryParameterValues({
      attributes: {
        withKey: ['singleKey'],
      },
    }).join(','),
  ).toMatchInlineSnapshot(
    `"attributes:key(singleKey),images.attributes:legacy(false)"`,
  );

  expect(
    productWithQueryParameterValues({
      attributes: {
        withKey: ['keyA', 'keyB'],
      },
    }).join(','),
  ).toMatchInlineSnapshot(
    `"attributes:key(keyA|keyB),images.attributes:legacy(false)"`,
  );

  expect(
    productWithQueryParameterValues({
      attributes: {
        ofType: ['type1', 'type2'],
      },
    }).join(','),
  ).toMatchInlineSnapshot(
    `"attributes:type(type1|type2),images.attributes:legacy(false)"`,
  );
});

it('Converts image filters', () => {
  // empty, because images are included by default
  expect(
    productWithQueryParameterValues({
      images: 'all',
    }).join(','),
  ).toMatchInlineSnapshot(`"images.attributes:legacy(false)"`);

  expect(
    productWithQueryParameterValues({
      images: {
        attributes: {},
      },
    }).join(','),
  ).toMatchInlineSnapshot(`"images.attributes:legacy(false)"`);

  expect(
    productWithQueryParameterValues({
      images: {
        attributes: {
          withKey: ['singleKey'],
        },
      },
    }).join(','),
  ).toMatchInlineSnapshot(`"images.attributes:legacy(false):key(singleKey)"`);

  expect(
    productWithQueryParameterValues({
      images: {
        attributes: {
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
  ).toMatchInlineSnapshot(`"images.attributes:legacy(false),categories"`);
});

it('Converts sibling filters', () => {
  expect(
    productWithQueryParameterValues({
      siblings: 'all',
    }).join(','),
  ).toMatchInlineSnapshot(`"images.attributes:legacy(false),siblings"`);

  expect(
    productWithQueryParameterValues({
      siblings: {
        attributes: 'all',
        categories: 'all',
      },
    }).join(','),
  ).toMatchInlineSnapshot(
    `"images.attributes:legacy(false),siblings,siblings.attributes,siblings.images.attributes:legacy(false),siblings.categories"`,
  );
});

it('Converts variant filters', () => {
  expect(
    productWithQueryParameterValues({
      variants: 'all',
    }).join(','),
  ).toMatchInlineSnapshot(`"variants,images.attributes:legacy(false)"`);

  expect(
    productWithQueryParameterValues({
      variants: {
        attributes: 'all',
      },
    }).join(','),
  ).toMatchInlineSnapshot(
    `"variants,variants.attributes,images.attributes:legacy(false)"`,
  );

  expect(
    productWithQueryParameterValues({
      variants: {
        attributes: {
          withKey: ['keyA'],
        },
      },
    }).join(','),
  ).toMatchInlineSnapshot(
    `"variants,variants.attributes:key(keyA),images.attributes:legacy(false)"`,
  );
});
