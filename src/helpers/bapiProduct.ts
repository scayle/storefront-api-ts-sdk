import {
  AttributeGroup,
  Attributes,
  BapiProduct,
  Variant,
} from 'bapi/types/BapiProduct';

export const getFirstAttributeValue = (
  attributes: Attributes | undefined,
  attributeName: string,
) => {
  const attribute = attributes && attributes[attributeName];
  if (!attribute || !attribute.values) {
    return;
  }

  return Array.isArray(attribute.values)
    ? Object.keys(attribute.values).length > 0
      ? attribute.values[0]
      : undefined
    : attribute.values;
};

export const findBrand = (
  entity: BapiProduct,
): {id: number; name: string} | undefined => {
  const brand = getFirstAttributeValue(entity.attributes, 'brand');
  if (!brand) {
    return;
  }

  return {
    id: brand.id || -1, // TODO: Err?
    name: brand.label,
  };
};

export function attributeLabel(
  attributeName: string,
  entity: BapiProduct,
): string | undefined {
  const value = getFirstAttributeValue(entity.attributes, attributeName);

  return value && value.label;
}

export function variantAttributeLabel(
  attributeName: string,
  variant: Variant,
): string | undefined {
  const value = getFirstAttributeValue(variant.attributes, attributeName);

  return value && value.label;
}

export function variantAttributeId(
  attributeName: string,
  variant: Variant,
): number | undefined {
  const value = getFirstAttributeValue(variant.attributes, attributeName);

  return value && value.id;
}

export function attributeNames(
  attributeNames: string[],
  entity: BapiProduct,
): Array<{value: string; label: string}> {
  const result: Array<{value: string; label: string}> = [];

  for (const attributeName of attributeNames) {
    const attribute = entity.attributes && entity.attributes[attributeName];
    const value = getFirstAttributeValue(entity.attributes, attributeName);

    if (!attribute || !value) {
      continue;
    }

    result.push({
      label: attribute.label,
      value: value.label,
    });
  }

  return result;
}

export function labelFromAttributeGroup(
  attributeGroup: AttributeGroup,
): string {
  return Array.isArray(attributeGroup.values)
    ? Object.keys(attributeGroup.values).length > 0
      ? attributeGroup.values[0].label
      : ''
    : attributeGroup.values.label;
}
