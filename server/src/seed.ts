import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seed/seeder.module';
import { Seeder } from './seed/seeder';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(async(appContext) => {
      const seeder = appContext.get(Seeder);
      await seeder
        .seed()
        .then(() => {
          console.log('Seeding complete!');
        })
        .catch(error => {
          console.log('Seeding failed!');
          throw error;
        })
    })
    .catch(error => {
      throw error;
    });
}
bootstrap();
