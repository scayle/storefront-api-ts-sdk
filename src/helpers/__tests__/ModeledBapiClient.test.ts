import {ModeledBapiClient} from '../ModeledBapiClient';
import * as nock from 'nock';
import {Value} from 'bapi/types/BapiProduct';

nock.disableNetConnect();

nock('https://api-cloud.example.com/')
  .options(/.*/)
  .reply(200, '', {'access-control-allow-origin': '*'})
  .persist();

it('Get basket', async () => {
  nock('https://api-cloud.example.com/')
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(
      '/v1/products/1?with=attributes%3Akey%28name%7Ccolor%7CquantityPerPack%7CisVisible%29',
    )
    .replyWithFile(200, __dirname + '/responses/product.json', {
      'Content-Type': 'application/json',
    });

  const client = new ModeledBapiClient({
    attributes: {
      name: 'value.label',
      color: 'value',
      quantityPerPack: 'value.asNumber',
      isVisible: 'value.asBoolean',
    },
    variants: {
      attributes: {
        shopSize: 'value.label',
      },
    },
  });

  const model = await client.getProductById(1);

  // type assignment test
  type ExpectedType = {
    attributes: {
      color: Value;
      isVisible: boolean;
      name: string;
      quantityPerPack: number;
    };
  };
  const typed: ExpectedType = model;

  expect(typed).toMatchInlineSnapshot(`
Object {
  "attributes": Object {
    "color": Object {
      "id": 38919,
      "label": "beige",
      "value": "beige",
    },
    "isVisible": true,
    "name": "'Candy Kiss' Eau de Parfum",
    "quantityPerPack": 1,
  },
  "variants": Array [
    Object {
      "attributes": Object {
        "shopSize": "30 ml",
      },
      "id": 33156972,
    },
    Object {
      "attributes": Object {
        "shopSize": "50 ml",
      },
      "id": 33748217,
    },
  ],
}
`);
});
