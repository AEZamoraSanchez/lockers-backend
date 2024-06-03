import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import db from './DataBase/tursoConnection';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin : process.env.FRONT
  })
  await app.listen(port);
  // if (db) console.log('TURSO CONECTED!');
}
bootstrap();
