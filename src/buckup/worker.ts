import { NestFactory } from '@nestjs/core';
import { BuckupModule } from './buckup.module';

async function bootstrap() {
  const app = await NestFactory.create(BuckupModule);
  app.init();
}

bootstrap();
