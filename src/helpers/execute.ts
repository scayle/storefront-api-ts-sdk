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
  shopId: number | null,
  bapiCall: BapiCall<SuccessResponseT>,
  acceptAllResponseCodes = false,
): Promise<BapiResponse<SuccessResponseT>> {
  const url = apiLocation + prepareUrl(bapiCall.endpoint, bapiCall.params);

  const shopIdHeader: ObjectMap<string> = {};
  if (shopId !== null) {
    shopIdHeader['X-Shop-Id'] = `${shopId}`;
  }

  const fetchOptions: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
