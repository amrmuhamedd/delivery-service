import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localauth.guard';
import { CreateUserDto } from './dto/createuser.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoggedInUser } from 'src/shared/decorator/logged-user';
import { User } from './model/users';
import { JwtAuthGuard } from './guards/jwtauth.guard';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() doc: LoginDto) {
    return this.authService.login(req.user._doc);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  async meInfo(@LoggedInUser() user : User) {
    return user;
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
