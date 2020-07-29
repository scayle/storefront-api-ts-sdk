import {BapiCall} from 'bapi/interfaces/BapiCall';
import {AttributeGroupMulti} from 'bapi/types/BapiProduct';

export type AttributeByKeyEndpointResponseData = AttributeGroupMulti;

export function createAttributeByKeyEndpointRequest(
  key: string,
): BapiCall<AttributeByKeyEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `attributes/${key}`,
  };
}
