import {RFC33339Date} from './Date';

export interface PromotionCustomData {
  [key: string]: unknown | undefined;
}

export type PromotionCondition = {
  level: 'item' | 'global';
  key: string;
  condition: string;
};

export type PromotionEffect =
  | {
      type: 'automatic_discount';
      additionalData: {
        type: 'absolute' | 'relative';
        value: number;
      };
    }
  | {
      type: 'buy_x_get_y';
      additionalData: {
        maxCount: number;
        variantIds: number[];
      };
    };

export type Promotion = {
  id: string;
  name: string;
  schedule: {
    from: RFC33339Date;
    to: RFC33339Date;
  };
  isActive: boolean;
  effect: PromotionEffect;
  conditions: PromotionCondition[];
  customData: PromotionCustomData;
};
