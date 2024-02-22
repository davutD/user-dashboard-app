import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // await new Promise((resolve) => setTimeout(resolve, 30000));

  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  await app.listen(3333);
}
bootstrap();
