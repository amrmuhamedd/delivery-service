import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, isEnum, IsOptional, IsString } from 'class-validator';
import { ParcelStatus } from '../enums/status.enum';
export class UpdateParcelDto {
  @IsString()
  @ApiProperty()
  id : string


  @IsOptional()
  @IsEnum(ParcelStatus)
  @ApiProperty()
  status : ParcelStatus;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  pickupDate : string

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  deliveryDate : string
  
}
