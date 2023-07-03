import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {BapiCall} from '../interfaces/BapiCall';
import {StorefrontAPIAuth} from './BapiClient';

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

  const shopIdHeader =
    shopIdPlacement === 'header' ? {'X-Shop-Id': `${shopId}`} : undefined;

  const fetchOptions: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(typeof window === 'undefined'
        ? {'accept-encoding': 'gzip, deflate'}
        : undefined),
      ...shopIdHeader,
    },
    url,
    method: bapiCall.method,
    data:
      bapiCall.method === 'POST' || bapiCall.method === 'PATCH'
        ? bapiCall.data
        : undefined,
    validateStatus: acceptAllResponseCodes
      ? () => true
      : statusCode => statusCode >= 200 && statusCode <= 299,
  };

  if (auth) {
    if ('token' in auth) {
      fetchOptions.headers!['X-Access-Token'] = auth.token;
    } else {
      fetchOptions.auth = {
        username: auth.username,
        password: auth.password,
      };
    }
  }

  const response: AxiosResponse<SuccessResponseT> = await axios.request(
    fetchOptions,
  );

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
