import { getParamsString } from './execute'

describe('getParamsString', () => {
  it('should return an empty string when no parameters are present', () => {
    expect(getParamsString({})).toBe('')
  })

  it('should skip undefined query values', () => {
    expect(
      getParamsString({
        campaignKey: undefined,
      }),
    ).toBe('')
  })

  it('should add a number query parameter', () => {
    expect(
      getParamsString({
        shopId: 1,
      }),
    ).toBe('?shopId=1')
  })

  it('should add a boolean query parameter', () => {
    expect(
      getParamsString({
        includeSoldOut: true,
      }),
    ).toBe('?includeSoldOut=true')
  })

  it('should add a string query parameter', () => {
    expect(
      getParamsString({
        referenceKey: 'abc0123',
      }),
    ).toBe('?referenceKey=abc0123')
  })

  it('should join multiple query parameters', () => {
    expect(
      getParamsString({
        referenceKey: 'abc0123',
        shopId: 10,
      }),
    ).toBe('?referenceKey=abc0123&shopId=10')
  })

  it('should escape the query key and value', () => {
    expect(
      getParamsString({
        'filters[term]': 'hello world',
      }),
    ).toBe('?filters%5Bterm%5D=hello%20world')
  })
})
