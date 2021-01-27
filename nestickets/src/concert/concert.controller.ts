import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { ConcertService } from './concert.service';
import { Concert } from './schemas/concert.schema';


@Controller('')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get('concerts')
  findAll(): Promise<Concert[]> {
    return this.concertService.findAll();
  }

  @Get('concert/:id')
  findOne(@Param('id') id): Promise<Concert> {
    return this.concertService.findOne(id);
  }

  @Post('concert')
  create(@Body() createConcertDto: CreateConcertDto): Promise<Concert> {
    return this.concertService.create(createConcertDto);
  }

  @Delete('concert/:id')
  delete(@Param('id') id): Promise<Concert> {
    return this.concertService.delete(id);
  }

  @Put('concert/:id')
  update(
    @Body() updateConcertDto: CreateConcertDto,
    @Param('id') id,
  ): Promise<Concert> {
    return this.concertService.update(id, updateConcertDto);
  }
}
