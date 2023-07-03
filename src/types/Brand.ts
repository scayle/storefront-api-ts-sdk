import {RFC33339Date} from '../types/BapiProduct';

export interface BrandCustomData {
  floatData: number;

  localizedJson: [];

  localizedString: [];

  nonLocalizedJson?: string;

  nonLocalizedString: string;
}

export interface Brand {
  /**
   * The unique identifier of the brand, can be used for retrieving specific brand. ID which would be used to filter for brands in the `products` and `filters` endpoint
   */
  id: number;

  /**
   * A short text to describe the current category (usable, for example, in URLs as `fashion`).
   */
  slug: string;

  /**
   * Name of the brand
   */
  name?: string;

  /**
   * Arbitrary custom data object to be added to the brand.
   */
  customData?: BrandCustomData;

  /**
   * External reference set by the client to integrate a third-party party system.
   */
  externalReference?: string;

  /**
   * Brand group.
   */
  group: string;

  /**
   * Whether the brand is currently active or not.
   */
  isActive: boolean;

  /**
   * Logo hash used for generating the full url.
   */
  logoHash: string;

  /**
   * Date string of creation, formatted according to RFC 3339, e.g. `2018-06-01 14:56:08`
   */
  createdAt: RFC33339Date;

  /**
   * Date string of last update, formatted according to RFC 3339, e.g. `2020-06-05 09:11:25`
   */
  updatedAt: RFC33339Date;
}
