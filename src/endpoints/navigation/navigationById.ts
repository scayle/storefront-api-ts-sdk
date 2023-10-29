import {BapiCall} from '../../helpers/execute';
import {NavigationTree} from '../../types/Navigation';
import {GetNavigationTreesParameters} from './navigation';

export type NavigationTreeEndpointResponse = NavigationTree;

export function createNavigationTreeEndpointRequest(
  navigationTreeId: number,
  parameters: GetNavigationTreesParameters = {},
): BapiCall<NavigationTreeEndpointResponse> {
  return {
    method: 'GET',
    endpoint: `/v1/navigation/trees/${navigationTreeId}`,
    params: {
      ...(parameters?.with?.category ? {with: 'category'} : {}),
    },
  };
}
