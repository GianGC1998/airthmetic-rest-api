import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import {
  AuthModule,
  HealhtcheckModule,
  RecordModule,
  UserModule,
} from './modules';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => DatabaseConfig.get,
    }),
    HealhtcheckModule,
    UserModule,
    AuthModule,
    RecordModule,
  ],
})
export class AppModule {}
