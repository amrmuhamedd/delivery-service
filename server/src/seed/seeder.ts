import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { usersData } from './userData';



@Injectable()
export class Seeder {
  constructor(
    private readonly AuthService: AuthService,
  ) {}

  async seed() {
    await this.users();
  }

  async users() {
    await this.AuthService.seed(usersData);
  }
}