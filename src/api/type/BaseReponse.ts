export type PagedResponse<T> = {
  success: boolean;
  data: T[];
  total: number;
  page?: number;
  limit?: number;
  totalPages: number;
};
