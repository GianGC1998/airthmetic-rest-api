import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../common/entities';
import {
  HashHelper,
  HttpErrors,
  throwError,
  throwException,
} from '../../common/helpers';

import { EnvConfig } from 'src/config/env.config';
import { UserService } from '../user/user.service';
import { LoginBody } from './misc';
import { JwtPayload } from './misc/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginBody: LoginBody) {
    try {
      const user = await this.userService.findOneByUsername(loginBody.username);

      if (!user) {
        throwError('The user does not exists.', HttpErrors.NotFound);
      } else if (!user.active) {
        throwError('Your account was disabled. Please, contact to support');
      } else {
        const { password } = await this.userService.getHiddenColumns(user.id);
        const passwordOk = await HashHelper.compare(
          loginBody.password,
          password,
        );
        if (passwordOk) {
          return this.createToken(user);
        } else {
          throwError('Incorrect credentials');
        }
      }
    } catch (error) {
      throwException(
        __filename,
        'login',
        error,
        'An error occurred at login. Please, contact to support',
      );
    }
  }

  private createToken(user: User) {
    const expiresIn = EnvConfig.jwtConfig().jwtExpiration;

    const accessToken = this.jwtService.sign(Object.assign({}, user), {
      expiresIn,
    });

    return {
      expiresIn,
      accessToken,
      user,
    };
  }

  async validateJwtPayload(payload: JwtPayload) {
    const result: User = await this.userService.findOneByUsername(
      payload.username,
    );

    if (!result || !result.active) throw new UnauthorizedException();

    return result;
  }
}
