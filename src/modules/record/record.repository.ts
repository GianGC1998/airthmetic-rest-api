import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { FindAllQueryDto } from '../../common/dto';
import { Record, User } from '../../common/entities';

@Injectable()
export class RecordRepository extends Repository<Record> {
  constructor(dataSource: DataSource) {
    super(Record, dataSource.createEntityManager());
  }
  async findRecords(
    user: User,
    skip: number,
    take: number,
    query: FindAllQueryDto,
  ): Promise<[Record[], number]> {
    const { filter, isActive, sorting } = query;

    const qb = this.createQueryBuilder('record')
      .innerJoinAndSelect('record.user', 'user')
      .innerJoinAndSelect('record.operation', 'operation')
      .where(
        new Brackets((sbq) => {
          sbq
            .where(`user.username LIKE "%${filter}%"`)
            .orWhere(`operation.type LIKE "%${filter}%"`)
            .orWhere(`record.amount LIKE "%${filter}%"`)
            .orWhere(`record.status LIKE "%${filter}%"`);
        }),
      )
      .andWhere('user.id = :id', { id: user.id });

    if (isActive != null) {
      qb.andWhere('user.active = :isActive', { isActive });
    }

    return qb
      .skip(skip)
      .take(take)
      .orderBy(`record.${sorting?.key ?? 'id'}`, sorting?.order ?? 'DESC')
      .getManyAndCount();
  }
}
