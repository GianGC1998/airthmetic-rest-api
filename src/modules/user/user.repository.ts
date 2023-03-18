import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../common/entities';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getHiddenColumns(id: number): Promise<User> {
    return this.createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();
  }
}
