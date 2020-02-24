import {
  AttributeGroup,
  Attributes,
  BapiProduct,
  Variant,
  Value,
} from 'bapi/types/BapiProduct';

/**
 * Returns the first value of an attribute.
 *
 * This returns undefined, if the attribute doesn't exist or if it doesn't have any values.
 *
 * @param attributes
 * @param attributeName
 */
export const getFirstAttributeValue = (
  attributes: Attributes | undefined,
  attributeName: string,
): Value | undefined => {
  const attribute = attributes && attributes[attributeName];
  if (!attribute || !attribute.values) {
    return;
  }

  if (attribute.multiSelect) {
    return attribute.values[0];
  }

  return attribute.values;
};

/**
 * This function always return a list.
 *
 * In case this attribute doesn't have any values or doesn't exist at all, it will return an empty list.
 * Otherwise this returns a list with the values.
 *
 * @param attributes
 * @param attributeName
 */
export const getAttributeValues = (
  attributes: Attributes | undefined,
  attributeName: string,
): Value[] => {
  const attribute = attributes && attributes[attributeName];
  if (!attribute || !attribute.values) {
    return [];
  }

  if (attribute.multiSelect) {
    return attribute.values;
  }

  return [attribute.values];
};

/// TODO: Deprecate IMO
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

/// TODO: Deprecate or rename?
export function attributeLabel(
  attributeName: string,
  entity: BapiProduct,
): string | undefined {
  const value = getFirstAttributeValue(entity.attributes, attributeName);

  return value && value.label;
}

/// TODO: Deprecate
export function variantAttributeLabel(
  attributeName: string,
  variant: Variant,
): string | undefined {
  const value = getFirstAttributeValue(variant.attributes, attributeName);

  return value && value.label;
}

/// TODO: Deprecate
export function variantAttributeId(
  attributeName: string,
  variant: Variant,
): number | undefined {
  const value = getFirstAttributeValue(variant.attributes, attributeName);

  return value && value.id;
}

/// TODO: Deprecate
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

/// TODO: Deprecate
export function labelFromAttributeGroup(
  attributeGroup: AttributeGroup,
): string {
  return Array.isArray(attributeGroup.values)
    ? Object.keys(attributeGroup.values).length > 0
      ? attributeGroup.values[0].label
      : ''
    : attributeGroup.values.label;
}
