import {BapiCall} from '../../helpers/execute';
import {PagePaginationResponse} from '../../types/Pagination';
import {Variant} from '../../types/Product';
import {VariantWith, variantWithQueryParameterValues} from '../../types/ProductWith';

export interface VariantsByIdsEndpointParameters {
  variantIds: number[];
  with?: VariantWith;
  campaignKey?: string;
  pricePromotionKey?: string;
}

export interface VariantsByIdsEndpointResponse {
  entities: Array<VariantWithProductID>;
  pagination: PagePaginationResponse;
}

export type VariantWithProductID = Variant & {productId: number};

export function createVariantsByIdsEndpointRequest(
  parameters: VariantsByIdsEndpointParameters,
): BapiCall<VariantsByIdsEndpointResponse> {
  return {
    method: 'GET',
    endpoint: `/v1/variants`,
    params: {
      ids: parameters.variantIds.join(`,`),
      ...(parameters.with ? {with: variantWithQueryParameterValues(parameters.with).join(`,`)} : undefined),
      ...(parameters.campaignKey ? {campaignKey: parameters.campaignKey} : undefined),
      ...(parameters.pricePromotionKey
        ? {
            pricePromotionKey: parameters.pricePromotionKey,
          }
        : undefined),
    },
  };
}
