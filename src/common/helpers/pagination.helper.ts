import { PaginatedResultDto } from '../../common/dto';

function getSkipAndTake(page: number, pageSize = 10) {
  let skip = 0;
  let take = 0;

  if (page > 0) {
    skip = pageSize * (page - 1);
    take = pageSize;
  }

  return {
    skip,
    take,
  };
}

function getPaginatedResult<T>(
  data: T[],
  quantity: number,
  take: number,
): PaginatedResultDto<T> {
  const result = new PaginatedResultDto<T>();

  result.data = data;
  result.total = quantity;
  result.pages = take > 0 ? Math.ceil(quantity / take) : 1;
  result.pageSize = take;

  return result;
}

export const PaginationHelper = {
  getSkipAndTake,
  getPaginatedResult,
};
