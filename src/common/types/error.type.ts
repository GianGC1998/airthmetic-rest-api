import { HttpErrors } from '../helpers';

export class ErrorException extends Error {
  public msg: string;
  public code: HttpErrors;
  constructor(msg: string, code: HttpErrors) {
    super(msg);
    this.msg = msg;
    this.code = code;
  }
}
