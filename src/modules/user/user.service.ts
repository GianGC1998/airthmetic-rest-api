import { Injectable } from '@nestjs/common';
import { throwError } from '../../common/helpers';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  //#region AUTH
  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throwError(`El usuario ${username} no existe`);
    }
    return user;
  }

  async getHiddenColumns(id: number) {
    return this.userRepository.getHiddenColumns(id);
  }
  //#endregion
}
