import { PaginationQueryDto } from '../dto';

export type FindAllQueryDto = PaginationQueryDto & {
  filter?: string;
  active?: number;
  isActive?: boolean;
  sorting?: { key: string; order: 'ASC' | 'DESC' };
};
