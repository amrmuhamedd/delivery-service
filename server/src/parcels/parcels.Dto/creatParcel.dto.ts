import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import { ParcelStatus } from '../enums/status.enum';
export class CreateParcelDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  pickUpAddress: string;
  @IsString()
  @ApiProperty()
  dropOffAddress: string;
}
