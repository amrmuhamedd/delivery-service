import {
  Injectable,
  Scope,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Model } from 'mongoose';
import { Parcels, ParcelDocument } from './models/parcels';
import { User, UsersDocument as UsersDocument } from '../auth/model/users';


import { CreateParcelDto } from './parcels.Dto/creatParcel.dto';
import { Role } from 'src/auth/roles/role.enum';
import { ParcelStatus } from './enums/status.enum';
import { UpdateParcelDto } from './parcels.Dto/upadateParcel.dto';

@Injectable({ scope: Scope.REQUEST })
export class ParcelsService {
  constructor(
    @InjectModel(Parcels.name) private ParcelModel: Model<ParcelDocument>,
    @InjectModel(User.name) private userModal: Model<UsersDocument>,
  ) {}

  async findall() {
    return await this.ParcelModel.find();
  }

  async createParcel(parcel: CreateParcelDto, user) {
    return await this.ParcelModel.create({
      ...parcel,
      sender: user.id,
    });
  }

  async findById(id) {
    return await this.ParcelModel.findById(id);
  }

  async findByUserID(id) {
    return await this.ParcelModel.find({ sender: id });
  }

  async pickParcel(id, user) {
    if (user.roles === Role.sender) {
      throw new ForbiddenException({
        status: 403,
        message: "you can't use your admin account to pick an order",
      });
    }
    const isPicked = await this.ParcelModel.findById(id);

    if (isPicked.isPicked && isPicked.picker !== user.id) {
      throw new BadRequestException({
        status: 400,
        message: 'sorry this parcel is already picked!',
      });
    }

    return await this.ParcelModel.findByIdAndUpdate(id, {
      status: ParcelStatus.picked,
      isPicked: true,
      picker: user.id,
    } ,  {new: true});
  }

  async changeStatus(updateParcel: UpdateParcelDto, user) {
    const parcel = await this.ParcelModel.findById(updateParcel.id);
    if (!parcel?.isPicked) {
      throw new ForbiddenException({
        status: 400,
        message: "you can't change the parcel without picked it",
      });
    }
 
    return await this.ParcelModel.findByIdAndUpdate(updateParcel.id, {
      ...updateParcel,
    } ,  {new: true});
  }
}
