import {CustomData} from './CustomData';
import {BapiPrice, Product, Variant} from './Product';

export type BasketItemPrice = Omit<BapiPrice, 'tax'>;

export type BasketTotalPrice = Omit<BapiPrice, 'tax' | 'reference'>;

export type BasketKey = string & {
  readonly ____tagBasketKey: unique symbol;
};

export type BasketResponse = {
  key: BasketKey;
  cost: BasketTotalPrice;
  items: BasketItem[];

  packages: BasketPackageInformation[];

  applicablePromotions?: ApplicablePromotion[];
};

export interface ApplicablePromotion {
  // The item ID on which the promotion is applicable for
  //
  // For buy_x_get_y effects where the free gift is not in the basket this key will not be defined.
  itemId?: string;
  promotion: Promotion;
}

export type ItemGroup = {
  id: string;
  isMainItem: boolean;
  isRequired: boolean;
};

export type BasketItem = {
  key: string;
  customData: CustomData;
  packageId: number;
  price: {
    total: BasketItemPrice;
    unit: BasketItemPrice;
  };
  quantity: number;
  availableQuantity: number;
  status: 'available' | 'unavailable' | 'deleted';
  product: Product;
  variant: Variant;
  displayData: BasketItemDisplayData;
  itemGroup?: ItemGroup;
};

export type BaskteItemDisplayDataItem = {
  value: string;
  label: string;
  key: string;
};

export type BasketItemDisplayDataKey = 'meta' | 'name' | 'identifier' | 'attribute-1' | 'attribute-2' | 'attribute-3';

export type BasketItemDisplayData = Partial<Record<BasketItemDisplayDataKey, BaskteItemDisplayDataItem>>;

export type BasketPackageInformation = {
  id: number;
  carrierKey: string;
  deliveryDate: {
    // Date like '2018-02-05'
    max: string;
    // Date like '2018-02-02'
    min: string;
  };
};
