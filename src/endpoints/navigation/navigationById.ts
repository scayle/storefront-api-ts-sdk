import {BapiCall} from '../../helpers/execute';
import {NavigationTree} from '../../types/Navigation';
import {GetNavigationParameters} from './navigation';

export type NavigationByIdEndpointResponseData = NavigationTree;

export function createNavigationByIdEndpointRequest(
  navigationTreeId: number,
  parameters: GetNavigationParameters,
): BapiCall<NavigationByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/navigation/trees/${navigationTreeId}`,
    params: {
      ...(parameters.locale ? {locale: parameters.locale} : {}),
      ...(parameters?.with?.category ? {with: 'category'} : {}),
    },
  };
}
