export interface OffsetPaginationResponse {
  total: number;
}

export interface PagePaginationResponse {
  current: number;
  total: number;
  perPage: number;
  page: number;
  first: number;
  prev: number;
  next: number;
  last: number;
}

export type ResponsePagination =
  | PagePaginationResponse
  | OffsetPaginationResponse;

export type InferResponsePagination<R extends RequestPagination> =
  R extends PagePaginationRequest
    ? PagePaginationResponse
    : OffsetPaginationResponse;

export interface PagePaginationRequest {
  page: number;
  perPage: number;
}

export interface OffsetPaginationRequest {
  offset: number;
  limit: number;
}

export type RequestPagination = PagePaginationRequest | OffsetPaginationRequest;

export const buildRequestPaginationParameters = (
  pagination?: RequestPagination,
) => {
  if (!pagination) {
    return {};
  }

  if ('offset' in pagination && 'limit' in pagination) {
    return pagination;
  }

  return pagination;
};
