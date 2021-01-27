import { IsNotEmpty, IsString } from 'class-validator';
export class CreateBandDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsString()
  readonly picture: string;
  @IsNotEmpty()
  @IsString()
  readonly genre: string;
  readonly created_at: Date;
}
