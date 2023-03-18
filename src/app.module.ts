import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { AuthModule, RecordModule, UserModule } from './modules';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => DatabaseConfig.get,
    }),
    UserModule,
    AuthModule,
    RecordModule,
  ],
})
export class AppModule {}
