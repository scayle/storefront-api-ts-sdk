import {Product, Variant} from './Product';

export type WishlistResponse = {
  key: string;
  items: WishlistItem[];
};

export type WishlistItem = {
  key: string;

  product: Product;
  variant?: Variant;
};
