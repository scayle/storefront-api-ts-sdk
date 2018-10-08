export interface BapiProduct {
  id: number;
  isActive: boolean;
  isSoldOut: boolean;
  isNew: boolean;
  createdAt: string; // Date string
  updatedAt: string; // Date string
  images: ProductImage[];
  variants: Variant[];
  attributes: Attributes;
  advancedAttributes?: AdvancedAttributes;
  categories?: BapiProductCategory[][];
  siblings?: BapiProduct[];
}

export interface BapiProductCategory {
  categoryId: number;
  categoryName: string;
  categoryUrl: string;
}

export interface ProductImage {
  hash: string;
  attributes: ImageAttributes;
}

export interface ImageAttributes {
  type: 'model' | 'bust' | string;
  focus: string;
  view: string | null;
  angle: string | null;
  preparation: string | null;
  next_detail_level?: number | null;
  // white, grey, ambient, transparent, null
  background: string | null;
  gender: string | null;
}

export interface Stock {
  merchantId: number;
  quantity: number;
  carriers: any[];
}

/**
 * Date string formatted according t RFC 3339
 *
 * e.g. `2018-06-01T14:56:08+02:00`
 */
export type RFC33339Date = string & {
  readonly ____tagRFC33339Date: unique symbol;
};

export interface Vat {
  amount: CentAmount;
  rate: number;
}

export interface Tax {
  vat: Vat;
}

export interface Variant {
  id: number;
  referenceKey?: string;
  createdAt: RFC33339Date;
  updatedAt: RFC33339Date;
  stock: Stock;
  price: BapiPrice;
  attributes?: Attributes;
  advancedAttributes?: AdvancedAttributes;
}

export type Attributes = ObjectMap<AttributeGroupSingle | AttributeGroupMulti>;

interface AttributeGroupBasic {
  key: string;
  label: string;
  type: string;
}

export interface AttributeGroupSingle extends AttributeGroupBasic {
  multiSelect: false;
  values: Value;
}

export interface AttributeGroupMulti extends AttributeGroupBasic {
  multiSelect: true;
  values: Value[]; // most have 1 value, but for example `extras` has many
}

export type AttributeGroup = AttributeGroupSingle | AttributeGroupMulti;

export interface Value {
  // TODO: Id is really optional, not set for `name` attribute in product
  id: number;
  label: string;
}

export interface AdvancedAttributes {
  [key: string]: any;
}

export interface BapiPrice {
  withTax: CentAmount;
  withoutTax: CentAmount;

  tax: {
    vat: {
      amount: CentAmount;
      // 0-1
      rate: number;
    };
    // possibly other taxes as well; neither are used by the frontend at the moment
  };

  reference?: {
    withTax: CentAmount;
    size: string;
    unit: string;
  } | null;

  /**
   * In order of application
   *
   * E.g. sale first (`[0]`), campaign second (`[1]`)
   */
  appliedReductions: AppliedReduction[];
}

export interface AppliedReduction {
  category: 'sale' | 'campaign' | 'voucher';
  type: 'relative' | 'absolute';
  amount: {
    // 0-1
    relative: number;
    // The absolute amount of money the user is saving by this reduction
    absoluteWithTax: CentAmount;
  };
}

export type CentAmount = number & {readonly ____tagCentAmount: unique symbol};
