import {Product, Variant} from './Product';

export type Wishlist = {
  key: string;
  items: WishlistItem[];
};

export interface WishlistItemCustomData {
  [key: string]: unknown | undefined;
}

export type WishlistItem = {
  key: string;

  product: Product;
  variant?: Variant;

  customData: WishlistItemCustomData;
};
