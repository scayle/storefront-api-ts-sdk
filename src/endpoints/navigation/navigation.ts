import {BapiCall} from 'bapi/interfaces/BapiCall';
import {NavigationTree} from 'bapi/types/navigation';

export type NavigationAllEndpointResponseData = NavigationTree[];

export interface NavigationWith {
  category: boolean;
}

export interface GetNavigationParameters {
  with?: NavigationWith;
  locale?: string;
}

export function createNavigationAllEndpointRequest(
  parameters: GetNavigationParameters,
): BapiCall<NavigationAllEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: 'navigation/trees',
    params: {
      ...(parameters.locale ? {locale: parameters.locale} : {}),
      ...(parameters?.with?.category ? {with: 'category'} : {}),
    },
  };
}
