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

export interface PagePaginationRequest {
    page: number; 
    perPage: number
}


export interface OffsetPaginationRequest {
    offset: number; 
    limit: number
}

export type RequestPagination =
  |PagePaginationRequest
  | OffsetPaginationRequest;
