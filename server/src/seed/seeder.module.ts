import { Module } from '@nestjs/common';
import { Seeder } from './seeder';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      useFactory :  () =>  {
        return {
          uri : process.env.DataBaseUrl
        }
      }
    }),
  ],
  providers: [Seeder],
})
export class SeederModule {}
