import {AdvancedAttributes, Attributes} from './Attributes';
import {CategoryCountryCustomData, CategoryProperty, CategoryShopCustomData} from './Category';
import {RFC33339Date} from './Date';

export interface ProductCustomData {
  [key: string]: unknown | undefined;
}

export type Product = {
  id: number;
  isActive: boolean;
  isSoldOut: boolean;
  isNew: boolean;

  createdAt: RFC33339Date;
  updatedAt: RFC33339Date;
  indexedAt: RFC33339Date;
  firstLiveAt: RFC33339Date;

  images: ProductImage[];
  masterKey: string;
  referenceKey: string;

  attributes?: Attributes;
  advancedAttributes?: AdvancedAttributes;

  variants?: Variant[];
  siblings?: Product[];

  priceRange?: PriceRange;
  reductionRange?: PriceRange;
  lowestPriorPrice?: LowestPriorPrice;

  categories?: ProductCategory[][];
  baseCategories?: BaseCategory[];
  searchCategoryIds?: number[];

  customData: ProductCustomData;
};

export type LowestPriorPrice = {
  withTax: number | null;
  relativeDifferenceToPrice: number | null;
};

export type BaseCategory = {
  categoryId: number;
  categoryName: string;
  categoryParentId: number;
  categoryPath: string;
};

export type PriceRange = {
  min: VariantPrice;
  max: VariantPrice;
};

export type ProductCategory = {
  categoryId: number;
  categoryName: string;
  categoryUrl: string;
  categorySlug: string;
  categoryHidden: boolean;
  categoryProperties: CategoryProperty[];
  countryLevelCustomData?: CategoryCountryCustomData;
  shopLevelCustomData?: CategoryShopCustomData;
};

export type ProductImage = {
  hash: string;

  attributes?: Attributes;
};

export type Stock = {
  supplierId: number;
  warehouseId: number;
  quantity: number;
  isSellableWithoutStock: boolean;
};

export type VariantCustomData = {
  [key: string]: unknown | undefined;
};

export type Variant = {
  id: number;
  referenceKey: string;
  createdAt: RFC33339Date;
  updatedAt: RFC33339Date;
  firstLiveAt: RFC33339Date;
  stock: Stock;
  price: VariantPrice;
  appliedPricePromotionKey?: string;
  attributes?: Attributes;
  advancedAttributes?: AdvancedAttributes;
  lowestPriorPrice?: LowestPriorPrice;
  customData: VariantCustomData;
};

export type VariantPrice = {
  withTax: CentAmount;
  withoutTax: CentAmount;
  recommendedRetailPrice: number | null;
  appliedReductions: AppliedReduction[];
  currencyCode: string;
  tax: {
    vat: {
      amount: CentAmount;
      rate: number;
    };
  };
  reference?: {
    withTax: CentAmount;
    size: number;
    unit: string;
  } | null;
};

export type AppliedReduction = {
  category: 'sale' | 'campaign' | 'promotion' | 'voucher';
  type: 'relative' | 'absolute';
  amount: {
    relative: number;
    absoluteWithTax: CentAmount;
  };
};

export type CentAmount = number & {readonly ____tagCentAmount: unique symbol};
