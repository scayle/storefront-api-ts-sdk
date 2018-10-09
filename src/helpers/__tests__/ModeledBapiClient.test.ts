import {ModeledBapiClient} from '../ModeledBapiClient';
import * as nock from 'nock';

nock.disableNetConnect();

nock('https://api-cloud.example.com/')
  .options(/.*/)
  .reply(200, '', {'access-control-allow-origin': '*'})
  .persist();

it('Get basket', async () => {
  nock('https://api-cloud.example.com/')
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/v1/products/1?with=attributes%3Akey%28name%7Ccolor%7CcolorDetail%29')
    .replyWithFile(200, __dirname + '/responses/product.json', {
      'Content-Type': 'application/json',
    });

  const client = new ModeledBapiClient({
    attributes: {
      name: 'string',
      color: 'single-value',
      colorDetail: 'string',
    },
  });

  const model = await client.getProductById(1);

  expect(model).toMatchInlineSnapshot(`
Object {
  "attributes": Object {
    "color": Object {
      "id": 38919,
      "label": "beige",
      "value": "beige",
    },
    "colorDetail": "nude",
    "name": "'Candy Kiss' Eau de Parfum",
  },
}
`);
});
