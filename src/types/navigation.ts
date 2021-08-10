import {RFC33339Date} from 'bapi/types/BapiProduct';

export type NavigationItem = {
  id: number;
  assets: {[key: string]: string};
  languages: {[key: string]: string};
  visibleFrom: RFC33339Date | null;
  visibleTo: RFC33339Date | null;
  children: NavigationItem[];
};

export type NavigationItemExternal = NavigationItem & {
  type: 'external';
  options: {
    url: string;
    isOpenInNewWindows: boolean;
  };
};

export type NavigationItemCategory = NavigationItem & {
  type: 'category';
  extraFilters: {[key: string]: {include: boolean}}[];
  categoryId: number;
};

export type NavigationItemPage = NavigationItem & {
  type: 'page';
  page: string;
};

export type NavigationTree = {
  id: number;
  key: string;
  name: string;
  items: (
    | NavigationItemExternal
    | NavigationItemCategory
    | NavigationItemPage
  )[];
};
