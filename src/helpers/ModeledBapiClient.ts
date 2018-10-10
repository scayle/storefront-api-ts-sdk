import {BapiClient} from './BapiClient';
import {
  AttributeGroupMulti,
  AttributeGroupSingle,
  Attributes,
  AdvancedAttributes,
  AdvancedAttribute,
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

type AdvancedAttributeMapping = {
  [key: string]:
    | 'numberValue'
    | 'asNumber'
    | 'stringValue'
    | 'stringListValue'
    | 'asMaterialComposition'
    | undefined;
};

type AdvancedAttributesMapping<T extends AdvancedAttributeMapping> = {
  [P in keyof T]: T[P] extends 'numberValue'
    ? number
    : (T[P] extends 'stringValue'
        ? string
        : (T[P] extends 'stringListValue'
            ? string[]
            : (T[P] extends 'asMaterialComposition'
                ? MaterialComposition[]
                : (T[P] extends 'asNumber' ? number : never))))
};

export type MaterialComposition = {
  label: string; // 'Obermaterial';
  materials: Array<{
    value: number | null; // 95;
    unit: string; // '%';
    label: string; // 'Baumwolle';
  }>;
};

interface VariantMapping {
  attributes?: AttributeMapping;
}

interface ProductMapping {
  attributes?: AttributeMapping;
  advancedAttributes?: AdvancedAttributeMapping;
  variants?: VariantMapping;
}

type AttributesMapping<T extends AttributeMapping> = {
  [P in keyof T]: T[P] extends 'value.label'
    ? string
    : (T[P] extends 'value.asBoolean'
        ? boolean
        : (T[P] extends 'value'
            ? {id: number; label: string; value: string}
            : (T[P] extends 'value.label?'
                ? string | undefined
                : (T[P] extends 'value.asNumber'
                    ? number
                    : (T[P] extends 'value.asNumber?'
                        ? number | undefined
                        : (T[P] extends 'value?'
                            ?
                                | {id: number; label: string; value: string}
                                | undefined
                            : (T[P] extends 'value.asBoolean?'
                                ? boolean | undefined
                                : (T[P] extends 'value.asString'
                                    ? string
                                    : (T[P] extends 'value.asString?'
                                        ? string | undefined
                                        : never)))))))))
};

type MappedProduct<T extends ProductMapping> = {
  advancedAttributes: T['advancedAttributes'] extends Exclude<
    T['advancedAttributes'],
    undefined
  >
    ? AdvancedAttributesMapping<T['advancedAttributes']>
    : {};
  attributes: T['attributes'] extends Exclude<T['attributes'], undefined>
    ? AttributesMapping<T['attributes']>
    : {};
  variants: T['variants'] extends Exclude<T['variants'], undefined>
    ? MappedVariants<T['variants']>
    : [];
};

type MappedVariant<T extends VariantMapping> = {
  id: number;
  attributes: T['attributes'] extends Exclude<T['attributes'], undefined>
    ? AttributesMapping<T['attributes']>
    : {};
};

type MappedVariants<T extends VariantMapping> = MappedVariant<T>[];

export class ModeledBapiClient<T extends ProductMapping> {
  constructor(private readonly productMapping: T) {}

  public async getProductById(productId: number): Promise<MappedProduct<T>> {
    const client = new BapiClient({
      host: 'https://api-cloud.example.com/v1/',
      appId: 1,
    });

    const bapiProduct = await client.products.getById(productId, {
      with: {
        advancedAttributes: this.productMapping.advancedAttributes
          ? {
              withKey: Object.keys(this.productMapping.advancedAttributes),
            }
          : undefined,
        attributes: this.productMapping.attributes
          ? {
              withKey: Object.keys(this.productMapping.attributes),
            }
          : undefined,
        variants: this.productMapping.variants
          ? {
              attributes: this.productMapping.variants.attributes
                ? {
                    withKey: Object.keys(
                      this.productMapping.variants.attributes,
                    ),
                  }
                : undefined,
            }
          : undefined,
      },
    });

    const mapped: MappedProduct<T> = {
      advancedAttributes: this.productMapping.advancedAttributes
        ? mapAdvancedAttributes(
            this.productMapping.advancedAttributes,
            bapiProduct.advancedAttributes!,
          )
        : {},
      attributes: this.productMapping.attributes
        ? mapAttributes(this.productMapping.attributes, bapiProduct.attributes)
        : {},
      variants: this.productMapping.variants
        ? (bapiProduct.variants.map(
            (variant): MappedVariant<Exclude<T['variants'], undefined>> => {
              return {
                id: variant.id,
                attributes: this.productMapping.variants!.attributes
                  ? mapAttributes(
                      this.productMapping.variants!.attributes!,
                      variant.attributes || {},
                    )
                  : {},
              };
            },
          ) as any) // TODO: Fix type signatures
        : [],
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

function mapAttributes(
  attributeMapping: AttributeMapping,
  attributes: Attributes,
): any {
  // FIXME type
  return Object.keys(attributeMapping).reduce(
    (mappedAttributes, key) => {
      const mapping = attributeMapping[key]!;
      const attribute = attributes[key];

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
        throw new Error(`Attribute ${key} is not a single value attribute`);
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
            throw new Error(`"value" of attribute "${key}" is not a number`);
          }

          mappedAttributes[key] = n;
          break;

        default:
          throw new Error(`Unexpected mapping "${mapping}"`);
      }

      return mappedAttributes;
    },
    {} as {[key: string]: any /* TODO */},
  ) as any;
}

function mapAdvancedAttributes(
  attributeMapping: AdvancedAttributeMapping,
  attributes: AdvancedAttributes,
): any {
  // FIXME types
  return Object.keys(attributeMapping).reduce(
    (mappedAttributes, key) => {
      const mapping = attributeMapping[key]!;
      const attribute = attributes[key];

      if (!attribute) {
        throw new Error(`Missing required attribute ${key}`);
      }

      switch (mapping) {
        case 'numberValue': {
          const firstFieldSetValue = attribute.values[0].fieldSet[0][0].value;
          if (typeof firstFieldSetValue !== 'number') {
            throw new Error(
              `Advanced attribute "${key}" has no value of type number`,
            );
          }
          mappedAttributes[key] = firstFieldSetValue;

          break;
        }

        case 'asNumber': {
          const firstFieldSetValue = attribute.values[0].fieldSet[0][0].value;
          if (typeof firstFieldSetValue !== 'string') {
            throw new Error(
              `Advanced attribute "${key}" has no value of type string (to be converted to number)`,
            );
          }

          if (firstFieldSetValue === '') {
            throw new Error(
              `Advanced attribute "${key}" contains empty string`,
            );
          }

          const n = +firstFieldSetValue;

          if (isNaN(n)) {
            throw new Error(`Advanced attribute "${key}" resulted in NaN`);
          }

          mappedAttributes[key] = n;

          break;
        }

        case 'stringValue': {
          const firstFieldSetValue = attribute.values[0].fieldSet[0][0].value;
          if (typeof firstFieldSetValue !== 'string') {
            throw new Error(
              `Advanced attribute "${key}" has no value of type string`,
            );
          }
          mappedAttributes[key] = firstFieldSetValue;

          break;
        }

        case 'stringListValue': {
          const values = attribute.values[0].fieldSet.map(
            field => field[0].value,
          );
          if (!values.every(value => typeof value === 'string')) {
            throw new Error(
              `Advanced attribute "${key}" hadn't all values of type "string"`,
            );
          }
          mappedAttributes[key] = values;

          break;
        }

        case 'asMaterialComposition':
          mappedAttributes[key] = materialCompositionFromAdvancedAttribute(
            attribute,
          );
          break;

        default:
          throw new Error(`Unexpected mapping "${mapping}"`);
      }

      return mappedAttributes;
    },
    {} as {[key: string]: any /* TODO */},
  ) as any;
}

function materialCompositionFromAdvancedAttribute(
  attribute: AdvancedAttribute,
): MaterialComposition[] {
  return attribute.values.map(value => {
    return {
      label: value.fieldSet[0][0].materialGroupName! as string,
      materials: value.groupSet[0].fieldSet.map(fieldSet => {
        return {
          value: fieldSet[0]!.value! as number | null,
          unit: fieldSet[1]!.unit! as string,
          label: fieldSet[2]!.material! as string,
        };
      }),
    };
  });
}
