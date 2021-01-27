import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Concert } from '../../concert/schemas/concert.schema';
import * as mongoose from "mongoose";
import { Band } from 'src/band/schemas/band.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  is_admin: boolean;

  @Prop([{type: mongoose.Schema.Types.ObjectId, ref:"Concert"}])
  tickets: Concert[];
  
  @Prop([{type: mongoose.Schema.Types.ObjectId, ref:"Band"}])
  favorite_bands: Band[];
 
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.post('save', function (doc, next) {
  doc
    .populate('tickets')
    .execPopulate()
    .then(function () {
      next();
    });
});

UserSchema.pre('find', function () {
  this.populate('tickets');
});

UserSchema.pre('findOne', function () {
  this.populate('tickets');
});