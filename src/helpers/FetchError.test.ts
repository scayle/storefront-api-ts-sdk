import { describe, it, expect } from 'vitest'
import { FetchError } from './FetchError'

describe('fetchError', () => {
  describe('constructor', () => {
    it('should create a FetchError instance with correct properties', () => {
      const mockResponse = {
        url: 'https://api.example.com/v1/products',
        status: 404,
        statusText: 'Not Found',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error).toBeInstanceOf(FetchError)
      expect(error).toBeInstanceOf(Error)
      expect(error.name).toBe('FetchError')
      expect(error.message).toBe(
        'Failed to fetch https://api.example.com/v1/products. 404 Not Found',
      )
      expect(error.response).toBe(mockResponse)
    })

    it('should handle response with empty statusText', () => {
      const mockResponse = {
        url: 'https://api.example.com/v1/products',
        status: 500,
        statusText: '',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.message).toBe(
        'Failed to fetch https://api.example.com/v1/products. 500 ',
      )
      expect(error.response).toBe(mockResponse)
    })

    it('should handle response with undefined statusText', () => {
      const mockResponse = {
        url: 'https://api.example.com/v1/products',
        status: 500,
        statusText: undefined,
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.message).toBe(
        'Failed to fetch https://api.example.com/v1/products. 500 undefined',
      )
      expect(error.response).toBe(mockResponse)
    })

    it('should handle response with special characters in URL', () => {
      const mockResponse = {
        url:
          'https://api.example.com/v1/products?category=electronics&brand=sony',
        status: 400,
        statusText: 'Bad Request',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.message).toBe(
        'Failed to fetch https://api.example.com/v1/products?category=electronics&brand=sony. 400 Bad Request',
      )
      expect(error.response).toBe(mockResponse)
    })

    it('should handle response with very long URL', () => {
      const longUrl = `https://api.example.com/v1/products/${'a'.repeat(1000)}`
      const mockResponse = {
        url: longUrl,
        status: 408,
        statusText: 'Request Timeout',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.message).toBe(
        `Failed to fetch ${longUrl}. 408 Request Timeout`,
      )
      expect(error.response).toBe(mockResponse)
    })

    it('should handle response with zero status code', () => {
      const mockResponse = {
        url: 'https://api.example.com/v1/products',
        status: 0,
        statusText: 'Network Error',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.message).toBe(
        'Failed to fetch https://api.example.com/v1/products. 0 Network Error',
      )
      expect(error.response).toBe(mockResponse)
    })

    it('should handle response with very large status code', () => {
      const mockResponse = {
        url: 'https://api.example.com/v1/products',
        status: 999999,
        statusText: 'Custom Status',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.message).toBe(
        'Failed to fetch https://api.example.com/v1/products. 999999 Custom Status',
      )
      expect(error.response).toBe(mockResponse)
    })
  })

  describe('inheritance', () => {
    it('should properly extend Error class', () => {
      const mockResponse = {
        url: 'https://api.example.com/v1/products',
        status: 500,
        statusText: 'Internal Server Error',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(FetchError)
      expect(FetchError.prototype).toBeInstanceOf(Error)
    })

    it('should have correct prototype chain', () => {
      const mockResponse = {
        url: 'https://api.example.com/v1/products',
        status: 400,
        statusText: 'Bad Request',
      } as Response

      const error = new FetchError(mockResponse)

      expect(Object.getPrototypeOf(error)).toBe(FetchError.prototype)
      expect(Object.getPrototypeOf(FetchError.prototype)).toBe(Error.prototype)
    })
  })

  describe('response property', () => {
    it('should store the response object correctly', () => {
      const mockResponse = {
        url: 'https://api.example.com/v1/products',
        status: 404,
        statusText: 'Not Found',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.response).toBe(mockResponse)
      expect(error.response.url).toBe('https://api.example.com/v1/products')
      expect(error.response.status).toBe(404)
      expect(error.response.statusText).toBe('Not Found')
    })

    it('should allow access to response properties', () => {
      const mockResponse = {
        url: 'https://api.example.com/v1/products',
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Headers({ 'content-type': 'application/json' }),
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.response.headers.get('content-type')).toBe(
        'application/json',
      )
    })
  })

  describe('error message format', () => {
    it('should format message with all response details', () => {
      const mockResponse = {
        url: 'https://api.example.com/v1/products/123',
        status: 422,
        statusText: 'Unprocessable Entity',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.message).toBe(
        'Failed to fetch https://api.example.com/v1/products/123. 422 Unprocessable Entity',
      )
    })

    it('should handle different HTTP status codes', () => {
      const statusCodes = [
        { status: 200, statusText: 'OK' },
        { status: 301, statusText: 'Moved Permanently' },
        { status: 400, statusText: 'Bad Request' },
        { status: 401, statusText: 'Unauthorized' },
        { status: 403, statusText: 'Forbidden' },
        { status: 404, statusText: 'Not Found' },
        { status: 500, statusText: 'Internal Server Error' },
        { status: 502, statusText: 'Bad Gateway' },
        { status: 503, statusText: 'Service Unavailable' },
      ]

      statusCodes.forEach(({ status, statusText }) => {
        const mockResponse = {
          url: 'https://api.example.com/v1/test',
          status,
          statusText,
        } as Response

        const error = new FetchError(mockResponse)

        expect(error.message).toBe(
          `Failed to fetch https://api.example.com/v1/test. ${status} ${statusText}`,
        )
      })
    })
  })

  describe('edge cases', () => {
    it('should handle response with null URL', () => {
      const mockResponse = {
        url: null,
        status: 500,
        statusText: 'Internal Server Error',
      } as any

      const error = new FetchError(mockResponse)

      expect(error.message).toBe(
        'Failed to fetch null. 500 Internal Server Error',
      )
      expect(error.response).toBe(mockResponse)
    })

    it('should handle response with undefined URL', () => {
      const mockResponse = {
        url: undefined,
        status: 500,
        statusText: 'Internal Server Error',
      } as any

      const error = new FetchError(mockResponse)

      expect(error.message).toBe(
        'Failed to fetch undefined. 500 Internal Server Error',
      )
      expect(error.response).toBe(mockResponse)
    })

    it('should handle response with empty string URL', () => {
      const mockResponse = {
        url: '',
        status: 500,
        statusText: 'Internal Server Error',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.message).toBe('Failed to fetch . 500 Internal Server Error')
      expect(error.response).toBe(mockResponse)
    })

    it('should handle response with relative URL', () => {
      const mockResponse = {
        url: '/v1/products',
        status: 404,
        statusText: 'Not Found',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.message).toBe('Failed to fetch /v1/products. 404 Not Found')
      expect(error.response).toBe(mockResponse)
    })

    it('should handle response with file URL', () => {
      const mockResponse = {
        url: 'file:///path/to/file.json',
        status: 0,
        statusText: 'File Error',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.message).toBe(
        'Failed to fetch file:///path/to/file.json. 0 File Error',
      )
      expect(error.response).toBe(mockResponse)
    })
  })

  describe('error handling in try-catch', () => {
    it('should be catchable in try-catch blocks', () => {
      const mockResponse = {
        url: 'https://api.example.com/v1/products',
        status: 500,
        statusText: 'Internal Server Error',
      } as Response

      try {
        throw new FetchError(mockResponse)
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError)
        expect(error).toBeInstanceOf(Error)

        if (error instanceof FetchError) {
          expect(error.response).toBe(mockResponse)
          expect(error.message).toBe(
            'Failed to fetch https://api.example.com/v1/products. 500 Internal Server Error',
          )
        }
      }
    })

    it('should maintain stack trace', () => {
      const mockResponse = {
        url: 'https://api.example.com/v1/products',
        status: 404,
        statusText: 'Not Found',
      } as Response

      const error = new FetchError(mockResponse)

      expect(error.stack).toBeDefined()
      expect(typeof error.stack).toBe('string')
      expect(error.stack!.length).toBeGreaterThan(0)
    })
  })

  describe('multiple instances', () => {
    it('should create independent instances', () => {
      const mockResponse1 = {
        url: 'https://api.example.com/v1/products',
        status: 404,
        statusText: 'Not Found',
      } as Response

      const mockResponse2 = {
        url: 'https://api.example.com/v1/categories',
        status: 500,
        statusText: 'Internal Server Error',
      } as Response

      const error1 = new FetchError(mockResponse1)
      const error2 = new FetchError(mockResponse2)

      expect(error1).not.toBe(error2)
      expect(error1.response).toBe(mockResponse1)
      expect(error2.response).toBe(mockResponse2)
      expect(error1.message).not.toBe(error2.message)
    })
  })
})
