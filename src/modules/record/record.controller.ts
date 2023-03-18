import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from '../../common/decorators';
import { FindAllQueryDto } from '../../common/dto';
import { User } from '../../common/entities';
import { CreateRecordBody } from './misc';
import { RecordService } from './record.service';

@Controller('records')
@UseGuards(AuthGuard())
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post('list')
  findAll(@LoggedUser() user: User, @Body() body: FindAllQueryDto) {
    return this.recordService.findAll(user, body);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.recordService.findById(id);
  }

  @Post()
  create(@LoggedUser() user: User, @Body() record: CreateRecordBody) {
    return this.recordService.create(user, record);
  }
}
