import {BapiCall} from '../../interfaces/BapiCall';
import {AttributeGroupMulti} from '../../types/BapiProduct';

export type AttributeByKeyEndpointResponseData = AttributeGroupMulti;

export function createAttributeByKeyEndpointRequest(
  key: string,
): BapiCall<AttributeByKeyEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `attributes/${key}`,
  };
}
