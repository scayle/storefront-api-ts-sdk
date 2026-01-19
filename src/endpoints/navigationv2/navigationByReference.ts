import type { StorefrontAPICall } from '../../helpers/execute'
import type { NavigationV2Tree } from '../../types/navigation'
import type { GetNavigationV2Parameters } from './navigation'

export type NavigationV2ByReferenceEndpointResponseData = NavigationV2Tree

export interface GetNavigationV2ByReferenceKeyParams
  extends GetNavigationV2Parameters
{
  referenceKey: string
}

/**
 * Creates a request configuration for fetching a specific navigation tree by reference key.
 *
 * @param parameters - The parameters for the navigation request
 * @param parameters.referenceKey - The reference key of the navigation tree to fetch
 * @param parameters.with - Additional data to include in the response
 * @param parameters.with.category - Whether to include category information in the navigation tree response
 * @param parameters.visibleAt - ISO timestamp to filter navigation items that should be visible at the specified date and time
 * @returns StorefrontAPICall configuration object for the navigation tree by reference key endpoint
 *
 * @see https://scayle.dev/en/api-guides/storefront-api/resources/navigation/list-navigations
 */
export function createNavigationV2ByReferenceEndpointRequest(
  parameters: GetNavigationV2ByReferenceKeyParams,
): StorefrontAPICall<NavigationV2ByReferenceEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `/v2/navigations/${parameters.referenceKey}`,
    params: {
      ...(parameters?.with?.category ? { with: 'category' } : {}),
      ...(parameters.visibleAt
        ? { 'filters[visibleAt]': parameters.visibleAt }
        : {}),
    },
  }
}
