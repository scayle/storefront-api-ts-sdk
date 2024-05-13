import type { StorefrontAPIAuth } from '../StorefrontAPIClient'
import { FetchError } from './FetchError'

export const getParamsString = (
  params: Partial<Record<string, string | number | boolean>>,
) => {
  let query = ''
  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      continue
    }

    if (query.length > 0) {
      query += '&'
    }

    query += `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  }

  if (query) {
    return `?${query}`
  }

  return ''
}

export type StorefrontAPICall<Response> =
  | {
    method: 'GET' | 'DELETE'
    endpoint: `/v1/${string}` | `/v2/${string}`
    params?: {
      [key: string]: string | boolean | number | undefined
    }
    // Status Codes which should be considered successful and parse and return the body data
    successfulResponseCodes?: number[]

    // This is needed to infer the types properly but it will never be used/set
    __res?: Response
  }
  | {
    method: 'POST' | 'PATCH'
    endpoint: `/v1/${string}` | `/v2/${string}`
    params?: {
      [key: string]: string | boolean | number | undefined
    }
    data?: any
    // Status Codes which should be considered successful and parse and return the body data
    successfulResponseCodes?: number[]

    // This is needed to infer the types properly but it will never be used/set
    __res?: Response
  }

export interface StorefrontAPIResponse<Response> {
  statusCode: number
  data: Response
}

export async function execute<Response>(
  host: string,
  shopId: number,
  bapiCall: StorefrontAPICall<Response>,
  auth?: StorefrontAPIAuth,
): Promise<StorefrontAPIResponse<Response>> {
  const url = `https://${host}${bapiCall.endpoint}${
    getParamsString({
      ...bapiCall.params,
      shopId,
    })
  }`

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(typeof window === 'undefined'
        ? { 'accept-encoding': 'gzip, deflate' }
        : undefined),
      ...(auth && auth.type === 'token'
        ? { 'X-Access-Token': auth.token }
        : {}),
    },
    method: bapiCall.method,
    body: bapiCall.method === 'POST' || bapiCall.method === 'PATCH'
      ? JSON.stringify(bapiCall.data)
      : undefined,
  })

  if (bapiCall.successfulResponseCodes) {
    if (!bapiCall.successfulResponseCodes.includes(response.status)) {
      throw new FetchError(response)
    }
  } else if (!response.ok) {
    throw new FetchError(response)
  }

  const data = await response.json()
  return {
    data,
    statusCode: response.status,
  }
}
