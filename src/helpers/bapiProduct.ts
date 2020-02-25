import {Attributes, Value} from 'bapi/types/BapiProduct';

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
    return attribute.values.length > 0 ? attribute.values[0] : undefined;
  }

  return attribute.values;
};

/**
 * This function always returns a list.
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
