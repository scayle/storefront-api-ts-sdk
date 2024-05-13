import type { StorefrontAPICall } from '../../helpers/execute'
import type { NavigationTree } from '../../types/navigation'

export type NavigationAllEndpointResponseData = NavigationTree[]

export interface NavigationWith {
  category: boolean
}

export interface GetNavigationParameters {
  with?: NavigationWith
  locale?: string
}

export function createNavigationAllEndpointRequest(
  parameters: GetNavigationParameters,
): StorefrontAPICall<NavigationAllEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: '/v1/navigation/trees',
    params: {
      ...(parameters.locale ? { locale: parameters.locale } : {}),
      ...(parameters?.with?.category ? { with: 'category' } : {}),
    },
  }
}
