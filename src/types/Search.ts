import {BapiCategory} from './BapiCategory';
import {BapiProduct} from './BapiProduct';

export type SearchEntity = CategorySearchSuggestion | ProductSearchSuggestion;

export type CategorySearchSuggestion = {
  type: 'category';
  categorySuggestion: {
    category: BapiCategory;
  };
};

export type ProductSearchSuggestion = {
  type: 'product';
  productSuggestion: {
    product: BapiProduct;
  };
};
