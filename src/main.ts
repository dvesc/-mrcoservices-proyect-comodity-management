import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true })); //Para que se activen las validaciones del DTO
  await app.listen(5250); //puerto
  console.log('Running in port 5250');
}
bootstrap();
