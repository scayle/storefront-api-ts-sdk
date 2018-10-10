import {BapiClient} from './BapiClient';
import {
  AttributeGroupMulti,
  AttributeGroupSingle,
} from 'bapi/types/BapiProduct';

type AttributeMapping = {
  [key: string]:
    | 'value'
    | 'value.label'
    | 'value.asString'
    | 'value.asBoolean'
    | 'value.asNumber' // TODO: Analogue `value.withX` to just extract and map the value?
    | 'value?'
    | 'value.label?'
    | 'value.asString?'
    | 'value.asBoolean?'
    | 'value.asNumber?'
    | undefined;
};

interface ProductMapping {
  attributes?: AttributeMapping;
}

type MappedProduct<T extends ProductMapping> = {
  attributes: {
    [P in keyof T['attributes']]: T['attributes'][P] extends 'value.label'
      ? string
      : (T['attributes'][P] extends 'value.asBoolean'
          ? boolean
          : (T['attributes'][P] extends 'value'
              ? {id: number; label: string; value: string}
              : (T['attributes'][P] extends 'value.label?'
                  ? string | undefined
                  : (T['attributes'][P] extends 'value.asNumber'
                      ? number
                      : (T['attributes'][P] extends 'value.asNumber?'
                          ? number | undefined
                          : (T['attributes'][P] extends 'value?'
                              ?
                                  | {id: number; label: string; value: string}
                                  | undefined
                              : (T['attributes'][P] extends 'value.asBoolean?'
                                  ? boolean | undefined
                                  : (T['attributes'][P] extends 'value.asString'
                                      ? string
                                      : (T['attributes'][P] extends 'value.asString?'
                                          ? string | undefined
                                          : never)))))))))
  };
};

export class ModeledBapiClient<T extends ProductMapping> {
  constructor(private readonly productMapping: T) {}

  public async getProductById(productId: number): Promise<MappedProduct<T>> {
    const client = new BapiClient({
      host: 'https://api-cloud.example.com/v1/',
      appId: 1,
    });

    const bapiProduct = await client.products.getById(productId, {
      with: {
        attributes: this.productMapping.attributes
          ? {
              withKey: Object.keys(this.productMapping.attributes),
            }
          : undefined,
      },
    });

    const mapped: MappedProduct<T> = {
      attributes: this.productMapping.attributes
        ? (Object.keys(this.productMapping.attributes).reduce(
            (mappedAttributes, key) => {
              const mapping = this.productMapping.attributes![key]!;
              const attribute = bapiProduct.attributes[key];

              if (
                !attribute &&
                (mapping === 'value?' ||
                  mapping === 'value.label?' ||
                  mapping === 'value.asString?' ||
                  mapping === 'value.asBoolean?' ||
                  mapping === 'value.asNumber?')
              ) {
                // attribute not included, but optional
                return mappedAttributes;
              }

              if (!attribute) {
                throw new Error(`Missing required attribute ${key}`);
              }

              if (!isSingleValue(attribute)) {
                throw new Error(
                  `Attribute ${key} is not a single value attribute`,
                );
              }

              switch (mapping) {
                case 'value':
                  mappedAttributes[key] = attribute.values;
                  break;

                case 'value.label':
                  if (typeof attribute.values.label !== 'string') {
                    throw new Error(
                      `"label" of attribute "${key}" is not of type "string"`,
                    );
                  }
                  mappedAttributes[key] = attribute.values.label;
                  break;

                case 'value.asString':
                  if (typeof attribute.values.label !== 'string') {
                    throw new Error(
                      `"value" of attribute "${key}" is not of type "string"`,
                    );
                  }
                  mappedAttributes[key] = attribute.values.value;
                  break;

                case 'value.asBoolean':
                  if (attribute.values.value === 'true') {
                    mappedAttributes[key] = true;
                  } else if (attribute.values.value === 'false') {
                    mappedAttributes[key] = false;
                  } else {
                    throw new Error(
                      `"value" of attribute "${key}" is not of neither "true" nor "false"`,
                    );
                  }
                  break;

                case 'value.asNumber':
                  if (
                    attribute.values.value === undefined ||
                    attribute.values.value === null ||
                    attribute.values.value === ''
                  ) {
                    // +(null) and +("") -> 0, so we need to add this special case
                    throw new Error(`"value" of attribute "${key}" is not set`);
                  }

                  const n = +attribute.values.value;
                  if (isNaN(n)) {
                    throw new Error(
                      `"value" of attribute "${key}" is not a number`,
                    );
                  }

                  mappedAttributes[key] = n;
                  break;

                default:
                  throw new Error(`Unexpected mapping "${mapping}"`);
              }

              return mappedAttributes;
            },
            {} as {[key: string]: any /* TODO */},
          ) as any)
        : {},
    };

    return mapped;
  }
}

function isSingleValue(
  o: AttributeGroupSingle | AttributeGroupMulti,
): o is AttributeGroupSingle {
  return (
    o.multiSelect === false &&
    o.values &&
    !Array.isArray(o.values) &&
    typeof o.values === 'object'
  );
}
