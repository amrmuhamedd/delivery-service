import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/model/users';
import { ParcelStatus } from '../enums/status.enum';
export type ParcelDocument = Parcels & Document;

@Schema({timestamps: true})
export class Parcels {
  @Prop()
  name: string;
  @Prop()
  pickUpAddress : string;
  @Prop()
  dropOffAddress : string; 
  @Prop({type : Boolean , default : false})
  isPicked: boolean;

  @Prop({enum : ParcelStatus , default : ParcelStatus.notPicked})
  status: ParcelStatus;

  @Prop({ type : Date })
  pickupDate : Date

  @Prop({ type : Date })
  deliveryDate : Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  picker: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: User;
}

export const ParcelSchema = SchemaFactory.createForClass(Parcels);
