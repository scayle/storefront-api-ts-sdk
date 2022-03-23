export interface BapiCategoryProperty {
  name: string;
  value: string;
  is_inheritable?: 1 | 0;
}

export interface BapiCategory {
  /**
   * the category id
   */
  id: number;
  /**
   * slugs for all `rootlineIds` combined with `/` (e.g., `/women/fashion`).
   */
  path: string;
  /**
   * the name of the category
   */
  name: string;
  /**
   *  short text to describe the current category (usable, for example, in URLs as `fashion`).
   */
  slug: string;
  /**
   * the description of the category
   */
  description: string;
  /**
   * parentId is 0 for root categories
   */
  parentId: number;
  /**
   * Contains the IDs for the path from the topmost root category to the current category, which is included as the last item.
   */
  rootlineIds?: number[];
  /**
   * child category IDs attached to the current category
   */
  childrenIds: number[];
  /**
   * Properties attached to this category.
   */
  properties?: BapiCategoryProperty[];
  /**
   * The category should not be shown in the front end if this is set to `true`.
   */
  isHidden: boolean;
  /**
   * Array of child category objects, if requested, using `with`.
   *
   * The childrenIds are always included.Array of child category objects, if requested, using `with`.
   *
   * The `childrenIds` are always included.
   */
  children?: BapiCategory[];
  /** Parent category, if existent and requested, using `with`. */
  parent?: BapiCategory;
  /**
   * nesting level of the category (root-level depth = 1, child nodes = 2, child nodes' children = 3, etc.)
   */
  depth: number;
  /**
   * a list of filters that can be used for filtering products in the category (for example, `armLength` or `mainMaterial`)
   */
  supportedFilter?: string[];
  /**
   *
   * @type {CategoryShopLevelCustomData}
   * @memberof Category
   */
  shopLevelCustomData?: any;
  /**
   *
   * @type {CategoryCountryLevelCustomData}
   * @memberof Category
   */
  countryLevelCustomData?: any;
}
