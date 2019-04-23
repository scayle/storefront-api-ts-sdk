import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {BapiCall} from 'bapi/interfaces/BapiCall';
import * as queryString from 'query-string';

const getParamsString = (params?: Partial<Record<string, any>>) => {
  if (!params) {
    return '';
  }

  const query = queryString.stringify(
    params as object,
    {
      arrayFormat: 'bracket',
      sort: false,
    } as any,
  );

  if (query) {
    return '?' + query;
  }

  return '';
};

function prepareUrl(
  endpoint: string,
  params: Partial<Record<string, string>> | undefined,
) {
  return endpoint + getParamsString(params);
}

export interface BapiResponse<T> {
  statusCode: number;
  headers: {[key: string]: string | undefined};
  url: string;
  data: T;
}

export async function execute<SuccessResponseT>(
  apiLocation: string,
  shopId: number,
  bapiCall: BapiCall<SuccessResponseT>,
  acceptAllResponseCodes = false,
  shopIdPlacement: 'header' | 'query' = 'query',
  auth?: {
    username: string;
    password: string;
  },
  additionalHeaders?: ObjectMap<string>,
): Promise<BapiResponse<SuccessResponseT>> {
  const params =
    shopIdPlacement === 'query'
      ? {...bapiCall.params, shopId: shopId}
      : bapiCall.params;

  const url = apiLocation + prepareUrl(bapiCall.endpoint, params);

  const shopIdHeader =
    shopIdPlacement === 'header' ? {'X-Shop-Id': `${shopId}`} : undefined;

  const fetchOptions: AxiosRequestConfig = {
    auth,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(typeof window === 'undefined'
        ? {'accept-encoding': 'gzip, deflate'}
        : undefined),
      ...shopIdHeader,
      ...additionalHeaders,
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

  const response: AxiosResponse<SuccessResponseT> = await axios(fetchOptions);

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
