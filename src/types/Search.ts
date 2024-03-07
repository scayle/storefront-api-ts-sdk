import {BapiCategory} from './BapiCategory';
import {BapiProduct} from './BapiProduct';

export type SearchEntity =
  | CategorySearchSuggestion
  | ProductSearchSuggestion
  | {type: undefined};

export type CategorySearchSuggestion = {
  type: 'category';
  categorySuggestion: {
    category: BapiCategory;
    filters: CategoryFilter[];
  };
};

type CategoryFilter = CategoryAttributeFilter | {type: undefined};

type CategoryAttributeFilter = {
  type: 'attribute';
  attributeFilter: {
    group: {
      id: number;
      key: string;
      label: string;
      type: string;
      multiSelect: boolean;
    };
    values: Array<{
      id: number;
      value: string;
      label: string;
    }>;
  };
};

export type ProductSearchSuggestion = {
  type: 'product';
  productSuggestion: {
    product: BapiProduct;
  };
};
