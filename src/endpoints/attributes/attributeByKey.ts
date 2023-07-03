import {BapiCall} from '../../helpers/execute';
import {AttributeGroupMulti} from '../../types/BapiProduct';

export type AttributeByKeyEndpointResponseData = AttributeGroupMulti;

export function createAttributeByKeyEndpointRequest(
  key: string,
): BapiCall<AttributeByKeyEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/attributes/${key}`,
  };
}
