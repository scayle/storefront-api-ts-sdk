import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getParamsString, execute } from './execute'
import type { StorefrontAPICall, StorefrontAPIResponse } from './execute'
import { FetchError } from './FetchError'

// Mock fetch globally
globalThis.fetch = vi.fn()

// Interface for mock fetch response
interface MockFetchResponse {
  ok: boolean
  status: number
  json: () => Promise<unknown>
}

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

  it('should skip falsy values correctly', () => {
    expect(
      getParamsString({
        emptyString: '',
        zero: 0,
        falseValue: false,
        nullValue: null as null | undefined,
        undefinedValue: undefined,
      }),
    ).toBe('')
  })

  it('should skip zero, false, and empty string values', () => {
    expect(
      getParamsString({
        zero: 0,
        falseValue: false,
        emptyString: '',
      }),
    ).toBe('')
  })

  it('should handle special characters in keys and values', () => {
    expect(
      getParamsString({
        'user@domain': 'value with spaces & symbols',
        'nested[property]': 'deep/value',
      }),
    ).toBe(
      '?user%40domain=value%20with%20spaces%20%26%20symbols&nested%5Bproperty%5D=deep%2Fvalue',
    )
  })
})

describe('execute', () => {
  const mockHost = 'api.example.com'
  const mockShopId = 123
  const mockEndpoint = '/v1/products'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('gET requests', () => {
    it('should make a GET request with correct URL and headers', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: mockEndpoint,
        params: { categoryId: 456, includeSoldOut: true },
      }

      const result = await execute(mockHost, mockShopId, bapiCall)

      expect(globalThis.fetch).toHaveBeenCalledWith(
        `https://${mockHost}${mockEndpoint}?categoryId=456&includeSoldOut=true&shopId=${mockShopId}`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'accept-encoding': 'gzip, deflate',
          }),
        }),
      )
      expect(result).toEqual({ statusCode: 200, data: { data: 'test' } })
    })

    it('should handle GET request without parameters', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: mockEndpoint,
      }

      const result = await execute(mockHost, mockShopId, bapiCall)

      expect(globalThis.fetch).toHaveBeenCalledWith(
        `https://${mockHost}${mockEndpoint}?shopId=${mockShopId}`,
        expect.any(Object),
      )
      expect(result.statusCode).toBe(200)
    })
  })

  describe('pOST requests', () => {
    it('should make a POST request with data and correct headers', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 201,
        json: vi.fn().mockResolvedValue({ id: 789 }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const postData = { name: 'Test Product', price: 29.99 }
      const bapiCall: StorefrontAPICall<{ id: number }> = {
        method: 'POST',
        endpoint: mockEndpoint,
        data: postData,
        params: { categoryId: 456 },
      }

      const result = await execute(mockHost, mockShopId, bapiCall)

      expect(globalThis.fetch).toHaveBeenCalledWith(
        `https://${mockHost}${mockEndpoint}?categoryId=456&shopId=${mockShopId}`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(postData),
          headers: expect.objectContaining({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }),
      )
      expect(result).toEqual({ statusCode: 201, data: { id: 789 } })
    })

    it('should handle PATCH request with data', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ updated: true }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const patchData = { name: 'Updated Product' }
      const bapiCall: StorefrontAPICall<{ updated: boolean }> = {
        method: 'PATCH',
        endpoint: mockEndpoint,
        data: patchData,
      }

      const result = await execute(mockHost, mockShopId, bapiCall)

      expect(globalThis.fetch).toHaveBeenCalledWith(
        `https://${mockHost}${mockEndpoint}?shopId=${mockShopId}`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(patchData),
        }),
      )
      expect(result.statusCode).toBe(200)
    })
  })

  describe('dELETE requests', () => {
    it('should make a DELETE request without body', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 204,
        json: vi.fn().mockResolvedValue(null),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const bapiCall: StorefrontAPICall<null> = {
        method: 'DELETE',
        endpoint: mockEndpoint,
        params: { productId: 789 },
      }

      const result = await execute(mockHost, mockShopId, bapiCall)

      expect(globalThis.fetch).toHaveBeenCalledWith(
        `https://${mockHost}${mockEndpoint}?productId=789&shopId=${mockShopId}`,
        expect.objectContaining({
          method: 'DELETE',
          body: undefined,
        }),
      )
      expect(result.statusCode).toBe(204)
    })
  })

  describe('authentication', () => {
    it('should include access token in headers when auth is provided', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: mockEndpoint,
      }

      const auth = { type: 'token' as const, token: 'test-token-123' }

      await execute(mockHost, mockShopId, bapiCall, auth)

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Access-Token': 'test-token-123',
          }),
        }),
      )
    })

    it('should not include access token when auth is not provided', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: mockEndpoint,
      }

      await execute(mockHost, mockShopId, bapiCall)

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.not.objectContaining({
            'X-Access-Token': expect.any(String),
          }),
        }),
      )
    })
  })

  describe('additional headers', () => {
    it('should merge additional headers with default headers', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: mockEndpoint,
        headers: { 'X-Custom-Header': 'custom-value' },
      }

      const additionalHeaders = { 'X-Additional-Header': 'additional-value' }

      await execute(
        mockHost,
        mockShopId,
        bapiCall,
        undefined,
        additionalHeaders,
      )

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Custom-Header': 'custom-value',
            'X-Additional-Header': 'additional-value',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }),
      )
    })

    it('should prioritize bapiCall headers over additional headers', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: mockEndpoint,
        headers: { 'X-Custom-Header': 'bapi-value' },
      }

      const additionalHeaders = { 'X-Custom-Header': 'additional-value' }

      await execute(
        mockHost,
        mockShopId,
        bapiCall,
        undefined,
        additionalHeaders,
      )

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Custom-Header': 'bapi-value', // bapiCall headers should take precedence
          }),
        }),
      )
    })
  })

  describe('successful response codes', () => {
    it('should accept custom successful response codes', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 201,
        json: vi.fn().mockResolvedValue({ data: 'created' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'POST',
        endpoint: mockEndpoint,
        data: { name: 'Test' },
        successfulResponseCodes: [201, 202],
      }

      const result = await execute(mockHost, mockShopId, bapiCall)

      expect(result.statusCode).toBe(201)
      expect(result.data).toEqual({ data: 'created' })
    })

    it('should throw FetchError for non-successful custom response codes', async () => {
      const mockResponse: MockFetchResponse = {
        status: 400,
        ok: false,
        json: vi.fn().mockResolvedValue({ error: 'Bad Request' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: mockEndpoint,
        successfulResponseCodes: [200, 201],
      }

      await expect(execute(mockHost, mockShopId, bapiCall)).rejects.toThrow(
        FetchError,
      )
    })
  })

  describe('error handling', () => {
    it('should throw FetchError for non-ok responses without custom successful codes', async () => {
      const mockResponse: MockFetchResponse = {
        status: 500,
        ok: false,
        json: vi.fn().mockResolvedValue({ error: 'Server Error' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: mockEndpoint,
      }

      await expect(execute(mockHost, mockShopId, bapiCall)).rejects.toThrow(
        FetchError,
      )
    })

    it('should handle network errors gracefully', async () => {
      const networkError = new Error('Network error')
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(
        networkError,
      )

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: mockEndpoint,
      }

      await expect(execute(mockHost, mockShopId, bapiCall)).rejects.toThrow(
        'Network error',
      )
    })
  })

  describe('browser vs Node.js environment', () => {
    it('should include accept-encoding header in Node.js environment', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      // Mock window as undefined to simulate Node.js environment
      const originalWindow = globalThis.window
      delete (globalThis as { window?: unknown }).window

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: mockEndpoint,
      }

      await execute(mockHost, mockShopId, bapiCall)

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'accept-encoding': 'gzip, deflate',
          }),
        }),
      )

      // Restore window
      globalThis.window = originalWindow
    })

    it('should not include accept-encoding header in browser environment', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      // Mock window to simulate browser environment
      const originalWindow = globalThis.window
      globalThis.window = {} as typeof globalThis.window

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: mockEndpoint,
      }

      await execute(mockHost, mockShopId, bapiCall)

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.not.objectContaining({
            'accept-encoding': expect.any(String),
          }),
        }),
      )

      // Restore window
      globalThis.window = originalWindow
    })
  })

  describe('uRL construction', () => {
    it('should construct URL with correct protocol and host', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: '/v2/categories',
      }

      await execute('test-api.com', mockShopId, bapiCall)

      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://test-api.com/v2/categories?shopId=123',
        expect.any(Object),
      )
    })

    it('should handle endpoints with leading slash', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockResponse as Response,
      )

      const bapiCall: StorefrontAPICall<{ data: string }> = {
        method: 'GET',
        endpoint: '/v1/products',
      }

      await execute(mockHost, mockShopId, bapiCall)

      expect(globalThis.fetch).toHaveBeenCalledWith(
        `https://${mockHost}/v1/products?shopId=${mockShopId}`,
        expect.any(Object),
      )
    })
  })
})

describe('storefrontAPICall type', () => {
  it('should allow GET requests without data', () => {
    const getCall: StorefrontAPICall<{ id: number }> = {
      method: 'GET',
      endpoint: '/v1/products',
      params: { categoryId: 123 },
    }

    expect(getCall.method).toBe('GET')
    expect(getCall.endpoint).toBe('/v1/products')
    expect(getCall.params?.categoryId).toBe(123)
  })

  it('should allow POST requests with data', () => {
    const postCall: StorefrontAPICall<{ id: number }> = {
      method: 'POST',
      endpoint: '/v1/products',
      data: { name: 'Test Product' },
      params: { categoryId: 123 },
    }

    expect(postCall.method).toBe('POST')
    expect(postCall.data).toEqual({ name: 'Test Product' })
  })

  it('should allow custom successful response codes', () => {
    const call: StorefrontAPICall<{ id: number }> = {
      method: 'GET',
      endpoint: '/v1/products',
      successfulResponseCodes: [200, 201, 204],
    }

    expect(call.successfulResponseCodes).toEqual([200, 201, 204])
  })

  it('should allow custom headers', () => {
    const call: StorefrontAPICall<{ id: number }> = {
      method: 'GET',
      endpoint: '/v1/products',
      headers: { 'X-Custom-Header': 'custom-value' },
    }

    expect(call.headers?.['X-Custom-Header']).toBe('custom-value')
  })
})

describe('storefrontAPIResponse type', () => {
  it('should have correct structure', () => {
    const response: StorefrontAPIResponse<{ id: number }> = {
      statusCode: 200,
      data: { id: 123 },
    }

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual({ id: 123 })
  })
})
