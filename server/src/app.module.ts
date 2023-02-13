import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ParcelsModule } from './parcels/parcels.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.DataBaseUrl, {
      useNewUrlParser: true, 
    }),
    AuthModule,
    ParcelsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
