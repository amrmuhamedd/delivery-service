import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ParcelsController } from './parcels.controller';
import { ParcelsService } from './parcels.service';
import { Parcels, ParcelSchema } from './models/parcels';
import { User, UserSchema } from '../auth/model/users';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Parcels.name, schema: ParcelSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ParcelsController],
  providers: [ParcelsService],
})
export class ParcelsModule {}
