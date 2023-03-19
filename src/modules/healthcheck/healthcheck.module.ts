import { Module } from '@nestjs/common';
import { HealhtcheckController } from './healthcheck.controller';

@Module({
  controllers: [HealhtcheckController],
})
export class HealhtcheckModule {}
