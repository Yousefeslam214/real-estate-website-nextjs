// types/api.ts

export interface PaginationResponse<T> {
  properties: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
