import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { Record } from '../../common/entities';
import { RecordRepository } from './record.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [RecordController],
  providers: [RecordService, RecordRepository],
})
export class RecordModule {}
