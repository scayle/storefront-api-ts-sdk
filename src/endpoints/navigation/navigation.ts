import {BapiCall} from '../../helpers/execute';
import {NavigationTree} from '../../types/Navigation';

export type NavigationTreesEndpointResponse = NavigationTree[];

export type NavigationWith = {
  category: boolean;
};

export type GetNavigationTreesParameters = {
  with?: NavigationWith;
};

export function createNavigationTreesEndpointRequest(
  parameters: GetNavigationTreesParameters = {},
): BapiCall<NavigationTreesEndpointResponse> {
  return {
    method: 'GET',
    endpoint: '/v1/navigation/trees',
    params: {
      ...(parameters?.with?.category ? {with: 'category'} : {}),
    },
  };
}
