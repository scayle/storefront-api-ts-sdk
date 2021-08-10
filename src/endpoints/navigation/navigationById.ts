import {BapiCall} from 'bapi/interfaces/BapiCall';
import {NavigationTree} from 'bapi/types/navigation';

export type NavigationByIdEndpointResponseData = NavigationTree;

export function createNavigationByIdEndpointRequest(
  navigationTreeId: number,
): BapiCall<NavigationByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `navigation/trees/${navigationTreeId}`,
  };
}
