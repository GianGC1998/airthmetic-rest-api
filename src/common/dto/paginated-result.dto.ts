export class PaginatedResultDto<T> {
  data: T[];
  total: number;
  pages: number;
  pageSize: number;
}
