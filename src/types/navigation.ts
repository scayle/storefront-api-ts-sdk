import {RFC33339Date} from 'bapi/types/BapiProduct';

export type NavigationItem = {
  id: number;
  assets: {[key: string]: string};
  languages: {[key: string]: string};
  visibleFrom: RFC33339Date | null;
  visibleTo: RFC33339Date | null;
  children: NavigationItems;
};

export type NavigationItemExternal = NavigationItem & {
  type: 'external';
  options: {
    url: string;
    isOpenInNewWindows: boolean;
  };
};

export type NavigationItemExtraFilter = {
  include?: number[];
  exclude?: number[];
};

export type NavigationItemAttributeExtraFilter = NavigationItemExtraFilter & {
  attribute: {
    id: number;
    key: string;
    label: string;
    type: string;
    multiSelect: boolean;
  };
};

export type NavigationItemCategory = NavigationItem & {
  type: 'category';
  extraFilters: {
    [key: string]:
      | NavigationItemExtraFilter
      | NavigationItemAttributeExtraFilter[];
  }[];
  categoryId: number;
};

export type NavigationItemPage = NavigationItem & {
  type: 'page';
  page: string;
};

export type NavigationItems = (
  | NavigationItemExternal
  | NavigationItemCategory
  | NavigationItemPage
)[];

export type NavigationTree = {
  id: number;
  key: string;
  name: string;
  items: NavigationItems;
};
