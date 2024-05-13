import { parseHost } from './host'

describe('parseHost', () => {
  it('should return the host as is if the new format is provided', () => {
    expect(parseHost('test.storefront.api.scayle.cloud')).toBe(
      'test.storefront.api.scayle.cloud',
    )
  })

  it('should return the correct host if the old base url is provided', () => {
    expect(parseHost('https://test.storefront.api.scayle.cloud/v1/')).toBe(
      'test.storefront.api.scayle.cloud',
    )
  })
})
