import {StorefrontAPIAuth} from '../StorefrontAPIClient';
import {FetchError} from './FetchError';

export const getParamsString = (params?: Partial<Record<string, string | number | boolean>>) => {
  if (!params) {
    return '';
  }

  let query = '';
  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      continue;
    }

    if (query.length > 0) {
      query += '&';
    }

    query += `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }

  if (query) {
    return '?' + query;
  }

  return '';
};

export type BapiCall<SuccessResponseT> =
  | {
      method: 'GET' | 'DELETE';
      endpoint: string;
      params?: {
        [key: string]: string | boolean | number | undefined;
      };

      responseValidator?: (o: any) => o is SuccessResponseT;
    }
  | {
      method: 'POST' | 'PATCH';
      endpoint: string;
      params?: {
        [key: string]: string | boolean | number | undefined;
      };
      data?: any;

      responseValidator?: (o: any) => o is SuccessResponseT;
    };

export interface BapiResponse<T> {
  statusCode: number;
  headers: {[key: string]: string | undefined};
  url: string;
  data: T;
}

export async function execute<SuccessResponseT>(
  host: string,
  shopId: number,
  bapiCall: BapiCall<SuccessResponseT>,
  acceptAllResponseCodes: boolean = false,
  auth?: StorefrontAPIAuth,
  additionalHeaders?: {[key: string]: string | undefined},
): Promise<BapiResponse<SuccessResponseT>> {
  const url = `https://${host}${bapiCall.endpoint}${getParamsString({...bapiCall.params, shopId: shopId})}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(typeof window === 'undefined' ? {'accept-encoding': 'gzip, deflate'} : undefined),
      ...additionalHeaders,
      ...(auth && auth.type === 'token' ? {'X-Access-Token': auth.token} : {}),
    },
    method: bapiCall.method,
    body: bapiCall.method === 'POST' || bapiCall.method === 'PATCH' ? JSON.stringify(bapiCall.data) : undefined,
  });

  if (!response.ok && !acceptAllResponseCodes) {
    throw new FetchError(response);
  }

  const data = await response.json();

  if (bapiCall.responseValidator && !bapiCall.responseValidator(data)) {
    throw new Error(`Invalid response data`);
  }

  const headers: {[key: string]: string | undefined} = {};
  response.headers.forEach((val, key) => (headers[key] = val));

  return {
    data,
    statusCode: response.status,
    url: response.url || url,
    headers,
  };
}
