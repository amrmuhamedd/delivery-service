import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { JwtAuthGuard } from 'src/auth/guards/jwtauth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/role.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateParcelDto } from './parcels.Dto/creatParcel.dto';
import { LoggedInUser } from 'src/shared/decorator/logged-user';
import { User } from 'src/auth/model/users';
import { UpdateParcelDto } from './parcels.Dto/upadateParcel.dto';

@ApiTags('parcels')
@Controller('parcels')
export class ParcelsController {
  constructor(private readonly ParcelsService: ParcelsService) {}
  @Get()
  findAll() {
    return this.ParcelsService.findall();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.sender)
  @ApiBearerAuth()
  @Post('create')
  createParcel(@Body() createParcelDto: CreateParcelDto , @LoggedInUser() user: User) {
    return this.ParcelsService.createParcel(createParcelDto , user)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.bicker)
  @ApiBearerAuth()
  @Patch('change-status')
  updateParcel(@Query() UpdateParcelDto : UpdateParcelDto , @LoggedInUser() user : User) {
    return this.ParcelsService.changeStatus(UpdateParcelDto , user)
  }
  @Get(':id')
  getParcelId(@Param('id') id: string) {
    return this.ParcelsService.findById(id);
  }

  @Get('user/:id')
  getParcelByUserId(@Param('id') id: string) {
    return this.ParcelsService.findByUserID(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('pick/:id')
  pickParcel(@Param('id') id: string, @LoggedInUser() user : User) {
    return this.ParcelsService.pickParcel(id , user);
  }


}
