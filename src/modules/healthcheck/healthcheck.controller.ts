import { Controller, Get } from '@nestjs/common';

@Controller('healhtcheck')
export class HealhtcheckController {
  @Get()
  findAll() {
    return { status: 'Ok' };
  }
}
