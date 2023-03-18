import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from '../../common/decorators';
import { User } from '../../common/entities';
import { AuthService } from './auth.service';
import { LoginBody } from './misc';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() login: LoginBody) {
    return this.authService.login(login);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  me(@LoggedUser() user: User) {
    return user;
  }
}
