import {RFC33339Date} from 'bapi/types/BapiProduct';

export interface Brand {
  id: number; // The unique identifier of the brand, can be used for retrieving specific brand from "/brands/brandId" endpoint
  attributeId: number; // ID which would be used to filter for brands in the "/products" and "/filters" endpoint
  customData?: unknown;
  externalReference: string;
  group: string;
  isActive: boolean;
  logoHash: string;
  createdAt: RFC33339Date;
  updatedAt: RFC33339Date;
}
