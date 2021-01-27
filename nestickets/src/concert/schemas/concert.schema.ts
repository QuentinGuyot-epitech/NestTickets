import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Band, BandSchema } from '../../band/schemas/band.schema';

export type ConcertDocument = Concert & Document;

@Schema()
export class Concert {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Band' })
  band: Band;

  @Prop()
  description: string;

  @Prop()
  start_datetime: Date;

  @Prop()
  duration: number;

  @Prop()
  location: string;

  @Prop()
  price: number;

  @Prop()
  qty_tickets: number;

  @Prop()
  qr_code: string;

  @Prop()
  created_at: Date;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);

ConcertSchema.post('save', function (doc, next) {
  doc
    .populate('band')
    .execPopulate()
    .then(function () {
      next();
    });
});

ConcertSchema.pre('findOne', function () {
  this.populate('band');
});

ConcertSchema.pre('find', function () {
  this.populate('band');
});