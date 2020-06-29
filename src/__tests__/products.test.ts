import {createProductsSearchEndpointRequest} from 'bapi/endpoints/products/products';
import {execute} from 'bapi/helpers/execute';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';
import {createProductByIdEndpointRequest} from 'bapi/endpoints/products/productById';

disableNetAndAllowBapiCors();

test('Fetch category products', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(
      `/v1/products?filters%5Bcategory%5D=20201&sortScore=category_scores&sortChannel=etkp&perPage=2&shopId=139`,
    )
    .replyWithFile(200, __dirname + '/responses/products.json', {
      'Content-Type': 'application/json',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    139,
    createProductsSearchEndpointRequest({
      where: {
        categoryId: 20201,
      },
      pagination: {
        perPage: 2,
      },
      sort: {
        score: 'category_scores',
        channel: 'etkp',
      },
    }),
  );

  expect(result.data.entities.length).toBe(2);

  return true;
});

test('Fetch unavailable product', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(`/v1/products/123?shopId=139`)
    .replyWithFile(404, __dirname + '/responses/product-not-found.json', {
      'Content-Type': 'application/json',
    });

  try {
    await execute(
      'https://api-cloud.example.com/v1/',
      139,
      createProductByIdEndpointRequest({
        productId: 123,
      }),
    );
  } catch (e) {
    expect(e.message).toBe(`Request failed with status code 404`);
    return;
  }

  fail('Expected exception');
});

test('Product by ID request', async () => {
  expect(
    createProductByIdEndpointRequest({
      productId: 123,
      with: {
        attributes: 'all',
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products/123",
  "method": "GET",
  "params": Object {
    "with": "attributes,images.attributes:legacy(false)",
  },
}
`);
});

test('Product by ID request with price promotion key', async () => {
  expect(
    createProductByIdEndpointRequest({
      productId: 123,
      pricePromotionKey: 'abc123',
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products/123",
  "method": "GET",
  "params": Object {
    "pricePromotionKey": "abc123",
  },
}
`);
});

test('Product by ID with categories', async () => {
  expect(
    createProductByIdEndpointRequest({
      productId: 123,
      with: {
        categories: {
          properties: 'all',
        },
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products/123",
  "method": "GET",
  "params": Object {
    "with": "images.attributes:legacy(false),categories,categories.properties",
  },
}
`);

  expect(
    createProductByIdEndpointRequest({
      productId: 123,
      with: {
        categories: 'all',
      },
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products/123",
  "method": "GET",
  "params": Object {
    "with": "images.attributes:legacy(false),categories",
  },
}
`);
});

test('sellable for free parameter', () => {
  expect(
    createProductByIdEndpointRequest({
      productId: 123,
      includeSellableForFree: true,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products/123",
  "method": "GET",
  "params": Object {
    "includeSellableForFree": true,
  },
}
`);

  expect(
    createProductsSearchEndpointRequest({
      where: {
        categoryId: 20201,
      },
      includeSellableForFree: true,
    }),
  ).toMatchInlineSnapshot(`
Object {
  "endpoint": "products",
  "method": "GET",
  "params": Object {
    "filters[category]": 20201,
    "includeSellableForFree": true,
  },
}
`);
});
