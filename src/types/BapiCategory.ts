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
  properties: any[];
  isHidden: boolean;

  children?: BapiCategory[];
  parent?: BapiCategory;
}
