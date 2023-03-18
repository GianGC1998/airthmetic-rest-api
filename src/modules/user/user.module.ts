import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../common/entities';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
