export interface BapiCategoryProperty {
  name: string;
  value: string;
  is_inheritable?: 1 | 0;
}

export interface BapiCategory {
  id: number;
  path: string;
  name: string;
  slug: string;
  description: string;
  // parentId is 0 for root categories
  parentId: number;
  rootlineIds: number[];
  childrenIds: number[];
  properties: BapiCategoryProperty[];
  isHidden: boolean;

  children?: BapiCategory[];
  parent?: BapiCategory;
  depth: number;
}
