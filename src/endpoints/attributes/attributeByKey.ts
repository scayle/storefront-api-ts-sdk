import {BapiCall} from 'bapi/interfaces/BapiCall';
import {AttributeGroupMulti} from 'bapi/types/BapiProduct';

export type FiltersEndpointResponseData = AttributeGroupMulti;

export function createAttributeByKeyEndpointRequest(
  key: string,
): BapiCall<FiltersEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `attributes/${key}`,
  };
}
