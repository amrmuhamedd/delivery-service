import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, Length, NotContains } from 'class-validator';
import { Role } from '../roles/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  @NotContains(' ', { message: "user name shouldn't countain white spaces" })
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @Length(6, 20)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(Role)
  roles: Role;
  _id;
}
