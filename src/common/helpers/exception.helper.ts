import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Logger } from '../singleton';
import { ErrorException } from '../types';

export enum HttpErrors {
  BadRequest = '400',
  Unauthorized = '401',
  NotFound = '404',
  InternalError = '500',
}

export const throwError = (
  msg: string,
  code: HttpErrors = HttpErrors.BadRequest,
) => {
  throw new ErrorException(msg, code);
};

export const throwException = (
  file: string,
  func: string,
  errorException: ErrorException,
  error: string,
) => {
  Logger.error({ file, func, error: errorException });

  switch (errorException.code) {
    case HttpErrors.BadRequest:
      throw new BadRequestException(errorException.msg || error);
    case HttpErrors.Unauthorized:
      throw new UnauthorizedException(errorException.msg || error);
    case HttpErrors.NotFound:
      throw new NotFoundException(errorException.msg || error);
    case HttpErrors.InternalError:
      throw new InternalServerErrorException(errorException.msg || error);
    default:
      throw new InternalServerErrorException(errorException.msg || error);
  }
};
