import {BapiCall} from '../../helpers/execute';
import {AttributeGroupMulti} from '../../types/Product';

export type AttributeByKeyEndpointResponse = AttributeGroupMulti;

export function createAttributeByKeyEndpointRequest(key: string): BapiCall<AttributeByKeyEndpointResponse> {
  return {
    method: 'GET',
    endpoint: `/v1/attributes/${key}`,
  };
}
