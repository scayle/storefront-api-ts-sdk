/**
 * BAPI only allows `AND` filters on items
 *
 * So this allows to only either keys or types
 *
 * Since `key` is also unique, it wouldn't make any sense to also provide `type` in that case
 */
export type AttributeFilter = AttributeKeyFilter | AttributeTypeFilter;

interface AttributeKeyFilter {
  withKey: string[];
  ofType?: undefined; // added such that a caller can't provide values for both, which would otherwise be allowed
}

interface AttributeTypeFilter {
  ofType: string[];
  withKey?: undefined; // added such that a caller can't provide values for both, which would otherwise be allowed
}

export type AttributeInclude = 'all' | AttributeFilter;

export function attributeIncludeParameters(
  type: 'attributes' | 'advancedAttributes',
  attributeInclude: AttributeInclude | undefined,
): string[] {
  if (!attributeInclude) {
    return [];
  }

  const parameterValues: string[] = [];

  if (attributeInclude === 'all') {
    parameterValues.push(type);
  } else {
    if (attributeInclude.withKey) {
      parameterValues.push(`${type}:key(${attributeInclude.withKey.join('|')})`);
    }

    if (attributeInclude.ofType) {
      parameterValues.push(`${type}:type(${attributeInclude.ofType.join('|')})`);
    }
  }

  return parameterValues;
}

export function prefixList(prefix: string): (list: string[]) => string[] {
  return list => list.map(value => `${prefix}${value}`);
}
