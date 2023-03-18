import { env } from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

type Environment = {
  port: () => string;
  environment: () => string;
  jwtConfig: () => {
    jwtKey: string;
    jwtExpiration: number;
  };
  dbConfig: () => {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
};

export const EnvConfig: Environment = {
  port: () => env.PORT,
  environment: () => env.ENVIRONMENT,
  jwtConfig: () => ({
    jwtKey: env.JWT_KEY,
    jwtExpiration: Number(env.JWT_EXPIRATION),
  }),
  dbConfig: () => ({
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  }),
};
