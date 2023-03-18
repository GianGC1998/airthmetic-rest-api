import * as bcrypt from 'bcryptjs';

function hash(value: string): Promise<string> {
  return bcrypt.hash(value, 10);
}

function compare(value: string, hashValue: string): Promise<boolean> {
  return bcrypt.compare(value, hashValue);
}

export const HashHelper = {
  hash,
  compare,
};
