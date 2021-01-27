import { Band } from '../../band/schemas/band.schema';
import { IsNotEmpty, IsString, IsMongoId, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConcertDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsMongoId()
  readonly band: Band;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  readonly start_datetime: Date;
  @IsNotEmpty()
  @IsInt()
  readonly duration: number;
  readonly location: string;
  readonly price: number;
  readonly qty_tickets: number;
  readonly qr_code: string;
  readonly created_at: Date;
}
