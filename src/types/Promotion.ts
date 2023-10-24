import {RFC33339Date} from './BapiProduct';

export interface PromotionCustomData {
  [key: string]: unknown | undefined;
}

export interface PromotionCondition {
  level: 'item' | 'global';
  key: string;
  condition: string;
}

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

export interface Promotion {
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
}
