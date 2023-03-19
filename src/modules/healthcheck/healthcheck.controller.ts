import { Controller, Get } from '@nestjs/common';

@Controller('healhtcheck')
export class HealhtcheckController {
  @Get()
  healthcheck() {
    return { status: 'Ok' };
  }
}
