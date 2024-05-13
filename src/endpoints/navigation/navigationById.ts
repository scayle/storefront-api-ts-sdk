import type { StorefrontAPICall } from '../../helpers/execute'
import type { NavigationTree } from '../../types/navigation'
import type { GetNavigationParameters } from './navigation'

export type NavigationByIdEndpointResponseData = NavigationTree

export function createNavigationByIdEndpointRequest(
  navigationTreeId: number,
  parameters: GetNavigationParameters,
): StorefrontAPICall<NavigationByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v1/navigation/trees/${navigationTreeId}`,
    params: {
      ...(parameters.locale ? { locale: parameters.locale } : {}),
      ...(parameters?.with?.category ? { with: 'category' } : {}),
    },
  }
}
