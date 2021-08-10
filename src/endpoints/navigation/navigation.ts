import {BapiCall} from 'bapi/interfaces/BapiCall';
import {NavigationTree} from 'bapi/types/navigation';

export type NavigationAllEndpointResponseData = NavigationTree[];

export function createNavigationAllEndpointRequest(): BapiCall<
  NavigationAllEndpointResponseData
> {
  return {
    method: 'GET',
    endpoint: 'navigation/trees',
  };
}
