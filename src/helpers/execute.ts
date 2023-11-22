import {BapiCall} from '../interfaces/BapiCall';
import {ObjectMap} from '../types/ObjectMap';
import * as queryString from 'query-string';
import {BapiAuthentication} from './BapiClient';
import {FetchError} from './FetchError';

export const getParamsString = (params?: Partial<Record<string, any>>) => {
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
  auth?: BapiAuthentication,
  additionalHeaders?: ObjectMap<string>,
): Promise<BapiResponse<SuccessResponseT>> {
  const params =
    shopIdPlacement === 'query'
      ? {...bapiCall.params, shopId: shopId}
      : bapiCall.params;

  const url = apiLocation + prepareUrl(bapiCall.endpoint, params);

  const shopIdHeader =
    shopIdPlacement === 'header' ? {'X-Shop-Id': `${shopId}`} : undefined;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(typeof window === 'undefined'
        ? {'accept-encoding': 'gzip, deflate'}
        : undefined),
      ...shopIdHeader,
      ...additionalHeaders,
      ...(auth && auth.type === 'token' ? {'X-Access-Token': auth.token} : {}),
      ...(auth && auth.type === 'basic' ? { 'Authorization': 'Basic ' + btoa(auth.username + ":" + auth.password) } : {})
    },
    method: bapiCall.method,
    body:
      bapiCall.method === 'POST' || bapiCall.method === 'PATCH'
        ? bapiCall.data
        : undefined,
  });

  const validateStatus = acceptAllResponseCodes
    ? () => true
    : (statusCode: number) => statusCode >= 200 && statusCode <= 299;

  if (!response.ok || !validateStatus(response.status)) {
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
