import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
const path = require('path');
const express = require('express');
const morgan = require('morgan');
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(morgan('dev'));
  // app.use(express.static(path.join(process.cwd(), './dist/')));
  // app.use('/assets', express.static(path.resolve(process.cwd(), 'dist/client/assets')));
  app.setGlobalPrefix('api');
  await app.listen(3000, () => Logger.log(`Server is up and listening at http://localhost:3000`));
}

bootstrap();
