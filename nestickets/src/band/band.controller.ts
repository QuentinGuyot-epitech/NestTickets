import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateBandDto } from './dto/create-band.dto';
import { BandService } from './band.service';
import { Band } from './schemas/band.schema';


@Controller('')
export class BandController {
  constructor(private readonly bandService: BandService) {}

  @Get('bands')
  findAll(): Promise<Band[]> {
    return this.bandService.findAll();
  }

  @Get('band/:id')
  findOne(@Param('id') id): Promise<Band> {
    return this.bandService.findOne(id);
  }

  @Post('band')
  create(@Body() createBandDto: CreateBandDto): Promise<Band> {
    return this.bandService.create(createBandDto);
  }

  @Delete('band/:id')
  delete(@Param('id') id): Promise<Band> {
    return this.bandService.delete(id);
  }

  @Put('band/:id')
  update(
    @Body() updateBandDto: CreateBandDto,
    @Param('id') id,
  ): Promise<Band> {
    return this.bandService.update(id, updateBandDto);
  }
}
