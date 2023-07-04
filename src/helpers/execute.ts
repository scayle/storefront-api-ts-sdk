import {AxiosInstance, AxiosResponse, AxiosRequestConfig} from 'axios';
import {StorefrontAPIAuth} from '../BapiClient';

export const getParamsString = (
  params?: Partial<Record<string, string | number | boolean>>,
) => {
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
  headers: AxiosResponse['headers'];
  url: string;
  data: T;
}

export async function execute<SuccessResponseT>(
  axios: AxiosInstance,
  host: string,
  shopId: number,
  bapiCall: BapiCall<SuccessResponseT>,
  acceptAllResponseCodes: boolean = false,
  shopIdPlacement: 'header' | 'query',
  auth?: StorefrontAPIAuth,
): Promise<BapiResponse<SuccessResponseT>> {
  const params =
    shopIdPlacement === 'query'
      ? {...bapiCall.params, shopId: shopId}
      : bapiCall.params;

  const url = `https://${host}${bapiCall.endpoint}${getParamsString(params)}`;

  const response: AxiosResponse<SuccessResponseT> = await axios.request({
    method: bapiCall.method,
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(typeof window === 'undefined'
        ? {'accept-encoding': 'gzip, deflate'}
        : {}),
      ...(shopIdPlacement === 'header' ? {'X-Shop-Id': `${shopId}`} : {}),
      ...(auth?.type === 'token' ? {'X-Access-Token': auth.token} : {}),
    },
    data:
      bapiCall.method === 'POST' || bapiCall.method === 'PATCH'
        ? bapiCall.data
        : undefined,
    validateStatus: acceptAllResponseCodes
      ? () => true
      : statusCode => statusCode >= 200 && statusCode <= 299,
    auth:
      auth?.type === 'basic'
        ? {
            username: auth.username,
            password: auth.password,
          }
        : undefined,
  } as AxiosRequestConfig);

  if (
    bapiCall.responseValidator &&
    !bapiCall.responseValidator(response.data)
  ) {
    throw new Error(`Invalid response data`);
  }

  return {
    data: response.data,
    statusCode: response.status,
    url: response.config.url || url,
    headers: response.headers,
  };
}
