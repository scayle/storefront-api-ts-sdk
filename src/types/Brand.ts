import {RFC33339Date} from './Date';

export interface BrandCustomData {
  [key: string]: unknown | undefined;
}

export type Brand = {
  id: number;
  slug: string;
  name: string;
  customData: BrandCustomData;
  externalReference: string;
  group: string;
  isActive: boolean;
  logoHash: string;
  createdAt: RFC33339Date;
  updatedAt: RFC33339Date;
};
