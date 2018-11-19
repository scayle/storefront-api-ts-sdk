import {BapiCall} from 'bapi/interfaces/BapiCall';
import {
  ProductWith,
  productWithQueryParameterValues,
} from 'bapi/types/ProductWith';
import {BapiMaster} from './query';
import {prefixList} from 'bapi/helpers/attributes';

export interface MasterByKeyEndpointParameters {
  masterKey: string;

  with?: {
    products: ProductWith;
  };

  campaignKey?: 'px' | undefined;
}

export type MasterByKeyEndpointResponseData = BapiMaster;

export function createMasterByIdEndpointRequest(
  parameters: MasterByKeyEndpointParameters,
): BapiCall<MasterByKeyEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `masters/${parameters.masterKey}`,
    params: {
      ...(parameters.with && parameters.with.products
        ? {
            with: prefixList(`products.`)(
              productWithQueryParameterValues(parameters.with.products),
            ).join(`,`),
          }
        : undefined),

      ...(parameters.campaignKey
        ? {campaignKey: parameters.campaignKey}
        : undefined),
    },
  };
}
