import {MaterialComposition} from '../ModeledBapiClient';
import {Value} from 'bapi/types/BapiProduct';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';
import {BapiClient} from '../BapiClient';

disableNetAndAllowBapiCors();

it('Get basket', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(
      '/v1/products/1?with=attributes%3Akey%28name%7Ccolor%7CquantityPerPack%7CisVisible%29%2CadvancedAttributes%3Akey%28minPrice%7Cname%7CbulletPoints%7CmaterialCompositionTextile%29%2Cvariants%2Cvariants.attributes%3Akey%28shopSize%29',
    )
    .replyWithFile(200, __dirname + '/responses/product.json', {
      'Content-Type': 'application/json',
    });

  const client = BapiClient.withModels(
    {
      host: 'https://api-cloud.example.com/v1/',
      shopId: 139,
    },
    {
      product: {
        attributes: {
          name: 'value.label',
          color: 'value',
          quantityPerPack: 'value.asNumber',
          isVisible: 'value.asBoolean',
        },
        advancedAttributes: {
          minPrice: 'asNumber',
          name: 'stringValue',
          bulletPoints: 'stringListValue',
          materialCompositionTextile: 'asMaterialComposition',
        },
        variants: {
          attributes: {
            shopSize: 'value.label',
          },
        },
      },
    },
  );

  const model = await client.products.getById(1);

  // type assignment test
  type ExpectedType = {
    attributes: {
      color: Value;
      isVisible: boolean;
      name: string;
      quantityPerPack: number;
    };
    advancedAttributes: {
      minPrice: number;
      name: string;
      bulletPoints: string[];
      materialCompositionTextile: MaterialComposition[];
    };
    variants: Array<{
      id: number;
      attributes: {
        shopSize: string;
      };
    }>;
  };
  const typed: ExpectedType = model;

  expect(typed).toMatchInlineSnapshot(`
Object {
  "advancedAttributes": Object {
    "bulletPoints": Array [
      "Langlebige, besonders abriebfeste Gummiaußensohle",
      "Stoßabsorbierende und dämpfende EVA-Zwischensohle",
      "Herausnehmbare Einlegesohle, die durch orthopädische Einlagen ersetzt werden kann",
    ],
    "materialCompositionTextile": Array [
      Object {
        "label": "Schuh-Obermaterial",
        "materials": Array [
          Object {
            "label": "Leder",
            "unit": "%",
            "value": null,
          },
        ],
      },
      Object {
        "label": "Obermaterial",
        "materials": Array [
          Object {
            "label": "Baumwolle",
            "unit": "%",
            "value": 95,
          },
          Object {
            "label": "Elasthan",
            "unit": "%",
            "value": 5,
          },
        ],
      },
    ],
    "minPrice": 2499,
    "name": "Langarm-Nachthemden",
  },
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
  "categories": undefined,
  "id": 3553214,
  "images": Array [
    Object {
      "attributes": Object {
        "imageBackground": Object {
          "key": "imageBackground",
          "label": "Bild Hintergrund",
          "multiSelect": false,
          "type": "",
          "values": Object {
            "id": 66504,
            "label": "weiß",
            "value": "white",
          },
        },
        "imageType": Object {
          "key": "imageType",
          "label": "Bild Typ",
          "multiSelect": false,
          "type": "",
          "values": Object {
            "id": 66480,
            "label": "Büste",
            "value": "bust",
          },
        },
      },
      "hash": "de505cc8c141d4212d30b35b02748431",
    },
    Object {
      "attributes": Object {
        "imageBackground": Object {
          "key": "imageBackground",
          "label": "Bild Hintergrund",
          "multiSelect": false,
          "type": "",
          "values": Object {
            "id": 66506,
            "label": "grau",
            "value": "grey",
          },
        },
        "imageType": Object {
          "key": "imageType",
          "label": "Bild Typ",
          "multiSelect": false,
          "type": "",
          "values": Object {
            "id": 66480,
            "label": "Büste",
            "value": "bust",
          },
        },
      },
      "hash": "2c1f2dcb163d56c94c7844f8b205665c",
    },
    Object {
      "attributes": Object {
        "imageBackground": Object {
          "key": "imageBackground",
          "label": "Bild Hintergrund",
          "multiSelect": false,
          "type": "",
          "values": Object {
            "id": 66504,
            "label": "weiß",
            "value": "white",
          },
        },
        "imageFocus": Object {
          "key": "imageFocus",
          "label": "Bild Fokus",
          "multiSelect": false,
          "type": "",
          "values": Object {
            "id": 66484,
            "label": "Produkt",
            "value": "product",
          },
        },
        "imageType": Object {
          "key": "imageType",
          "label": "Bild Typ",
          "multiSelect": false,
          "type": "",
          "values": Object {
            "id": 66480,
            "label": "Büste",
            "value": "bust",
          },
        },
        "imageView": Object {
          "key": "imageView",
          "label": "Bild Ansicht",
          "multiSelect": false,
          "type": "",
          "values": Object {
            "id": 66486,
            "label": "Frontalansicht",
            "value": "front",
          },
        },
      },
      "hash": "3d1c651db0d0cdf9fe8cf30b1121b0a4",
    },
  ],
  "isActive": true,
  "isNew": false,
  "isSoldOut": false,
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
