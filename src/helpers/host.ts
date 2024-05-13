/**
 * parseHost allows us to be backwards compatible with our configuration which has recently changed.
 *
 * 'internal-qa.storefront.api.scayle.cloud' will return the host as is.
 * 'https://internal-qa.storefront.api.scayle.cloud/v1/' will return just the host and strip the protocol and path.
 *
 * @param host
 */
export const parseHost = (host: string) => {
  if (host.startsWith('https://')) {
    return new URL(host).host
  }

  return host
}
