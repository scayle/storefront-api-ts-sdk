import {BapiCall} from 'bapi/interfaces/BapiCall';
import {Variant} from 'bapi/types/BapiProduct';
import {
  VariantWith,
  variantWithQueryParameterValues,
} from 'bapi/types/ProductWith';
import {Pagination} from '../products/productsByIds';

export interface VariantsByIdsEndpointParameters {
  variantIds: number[];
  with?: VariantWith;
  campaignKey?: 'px' | undefined;
  pricePromotionKey?: string;
}

export interface VariantsByIdsEndpointResponseData {
  entities: (Variant & {productId: number})[];
  pagination: Pagination;
}

export function createVariantsByIdsEndpointRequest(
  parameters: VariantsByIdsEndpointParameters,
): BapiCall<VariantsByIdsEndpointResponseData> {
  if (parameters.variantIds.length === 0) {
    throw new Error(`"variantIds" parameter must not be an empty array.`);
  }

  return {
    method: 'GET',
    endpoint: `variants`,
    params: {
      ids: parameters.variantIds.join(`,`),
      ...(parameters.with
        ? {with: variantWithQueryParameterValues(parameters.with).join(`,`)}
        : undefined),
      ...(parameters.campaignKey
        ? {campaignKey: parameters.campaignKey}
        : undefined),
      ...(parameters.pricePromotionKey
        ? {
            pricePromotionKey: parameters.pricePromotionKey,
          }
        : undefined),
    },
  };
}
