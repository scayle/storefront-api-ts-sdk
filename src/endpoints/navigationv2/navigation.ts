import type { StorefrontAPICall } from '../../helpers/execute'
import type { NavigationV2Tree } from '../../types/navigation'
import type { GetNavigationParameters } from '../navigation/navigation'

export type NavigationV2AllEndpointResponseData = NavigationV2Tree[]

export interface NavigationV2With {
  category: boolean
}

export type GetNavigationV2Parameters = Omit<GetNavigationParameters, 'locale'>

/**
 * Creates a request configuration for fetching all navigation trees.
 *
 * @param parameters - The parameters for the navigation request
 * @param parameters.with - Additional data to include in the response
 * @param parameters.with.category - Whether to include category information in the navigation tree response
 * @param parameters.visibleAt - ISO timestamp to filter navigation items that should be visible at the specified date and time
 * @returns StorefrontAPICall configuration object for the navigation trees endpoint
 *
 * @see https://scayle.dev/en/api-guides/storefront-api/resources/navigation/list-navigations
 */
export function createNavigationV2AllEndpointRequest(
  parameters: GetNavigationV2Parameters,
): StorefrontAPICall<NavigationV2AllEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: '/v2/navigations',
    params: {
      ...(parameters?.with?.category ? { with: 'category' } : {}),
      ...(parameters.visibleAt
        ? { 'filters[visibleAt]': parameters.visibleAt }
        : {}),
    },
  }
}
