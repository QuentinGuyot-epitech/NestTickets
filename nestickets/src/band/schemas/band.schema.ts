import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Concert, ConcertSchema } from '../../concert/schemas/concert.schema';

export type BandDocument = Band & Document;

@Schema()
export class Band {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  picture: string;

  @Prop()
  genre: string;

  @Prop()
  created_at: Date;
}

export const BandSchema = SchemaFactory.createForClass(Band);


