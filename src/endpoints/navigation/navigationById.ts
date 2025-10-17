import type { StorefrontAPICall } from '../../helpers/execute'
import type { NavigationTree } from '../../types/navigation'
import type { GetNavigationParameters } from './navigation'

export type NavigationByIdEndpointResponseData = NavigationTree

/**
 * Creates a request configuration for fetching a specific navigation tree by ID.
 *
 * @param navigationTreeId - The unique identifier of the navigation tree to fetch
 * @param parameters - The parameters for the navigation request
 * @param parameters.locale - The locale for which to fetch the navigation tree (e.g., "en", "de", "fr")
 * @param parameters.with - Additional data to include in the response
 * @param parameters.with.category - Whether to include category information in the navigation tree response
 * @param parameters.visibleAt - ISO timestamp to filter navigation items that should be visible at the specified date and time
 * @returns StorefrontAPICall configuration object for the navigation tree by ID endpoint
 *
 * @see https://scayle.dev/en/api-guides/storefront-api/resources/navigation/list-navigations
 */
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
      ...(parameters.visibleAt
        ? { 'filters[visibleAt]': parameters.visibleAt }
        : {}),
    },
  }
}
