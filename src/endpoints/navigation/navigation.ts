import type { StorefrontAPICall } from '../../helpers/execute'
import type { NavigationTree } from '../../types/navigation'

export type NavigationAllEndpointResponseData = NavigationTree[]

export interface NavigationWith {
  category: boolean
}

export interface GetNavigationParameters {
  with?: NavigationWith
  locale?: string
  visibleAt?: string
}

/**
 * Creates a request configuration for fetching all navigation trees.
 *
 * @param parameters - The parameters for the navigation request
 * @param parameters.locale - The locale for which to fetch the navigation tree
 * @param parameters.with - Additional data to include in the response
 * @param parameters.with.category - Whether to include category information in the navigation tree response
 * @param parameters.visibleAt - ISO timestamp to filter navigation items that should be visible at the specified date and time
 * @returns StorefrontAPICall configuration object for the navigation trees endpoint
 *
 * @see https://scayle.dev/en/api-guides/storefront-api/resources/navigation/list-navigations
 */
export function createNavigationAllEndpointRequest(
  parameters: GetNavigationParameters,
): StorefrontAPICall<NavigationAllEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: '/v1/navigation/trees',
    params: {
      ...(parameters.locale ? { locale: parameters.locale } : {}),
      ...(parameters?.with?.category ? { with: 'category' } : {}),
      ...(parameters.visibleAt
        ? { 'filters[visibleAt]': parameters.visibleAt }
        : {}),
    },
  }
}
