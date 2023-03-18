import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user;
});
