import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../roles/role.enum';
export type UsersDocumenet = User & Document;


@Schema()
export class User {
  @Prop({ required: true, unique: true, sparse: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true  , enum : Role })
  roles: Role;
  @Prop({ required: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
