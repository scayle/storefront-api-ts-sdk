// Base parameters for all category endpoints
export interface CategoryEndpointsParameters {
  with?: {
    // Whether or not to include the parents (up to the root node)
    parents?: 'all';

    // How many levels of children to load
    //
    // 0 means no children, 1 means 1 level of children, etc.
    children?: number;
  };

  // If `true`, hidden categories will be returned
  //
  // This is needed even if the hidden category is requested by ID or slug directly
  includeHidden?: true;
}

export function parametersForCategoryEndpoint(
  parameters: CategoryEndpointsParameters,
) {
  return {
    ...categoryWithQueryParameters(parameters.with),

    ...(parameters.includeHidden ? {showHidden: 'true'} : undefined),
  };
}

function categoryWithQueryParameters(
  categoryWith?: CategoryEndpointsParameters['with'],
): {with?: string; depth?: number; showHidden?: 'true'} {
  if (!categoryWith) {
    return {
      depth: 1,
    };
  }

  const withParams: string[] = [];

  if (categoryWith.parents) {
    withParams.push('parents');
  }

  if (categoryWith.children !== undefined && categoryWith.children > 0) {
    // Important to use `descendants` here instead of `children`, as children only supports one level of children
    withParams.push('descendants');
  }

  return {
    ...(withParams.length > 0 ? {with: withParams.join(',')} : undefined),
    depth: (categoryWith.children ?? 0) + 1,
  };
}
