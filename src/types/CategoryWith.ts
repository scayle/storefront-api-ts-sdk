export interface CategoryWith {
  parents?: 'all';
  children?: {
    // How many levels of children to load
    // For immediate children use 1
    depth: number;
    includeHidden?: boolean;
  };
}

export function categoryWithQueryParameters(
  categoryWith?: CategoryWith,
): {with?: string; depth?: number} {
  if (!categoryWith || (!categoryWith.parents && !categoryWith.children)) {
    return {};
  }

  const withParams: string[] = [];

  if (categoryWith.parents) {
    withParams.push('parents');
  }

  if (categoryWith.children) {
    // Important to use `descendants` here instead of `children`, as children only supports one level of children
    withParams.push('descendants');
  }

  return {
    with: withParams.join(','),
    depth: categoryWith.children ? categoryWith.children.depth + 1 : undefined,
  };
}
