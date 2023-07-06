import {Product, Variant} from './Product';

export interface WishlistResponse {
  key: string;
  items: WishlistItem[];
}

export interface WishlistItem {
  key: string;

  product: Product;
  variant?: Variant;
}
