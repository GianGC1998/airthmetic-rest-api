import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvConfig } from './env.config';

export class DatabaseConfig {
  static get get(): TypeOrmModuleOptions {
    const config = EnvConfig.dbConfig();
    return {
      ...config,
      type: 'mysql',
      entities: [__dirname + '/../common/entities/*.entity{.ts,.js}'],
      synchronize: true,
      charset: 'utf8',
      logging: false,
    };
  }
}
