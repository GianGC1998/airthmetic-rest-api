import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { EnvConfig } from './config/env.config';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.setGlobalPrefix('/api');
  app.use(morgan('dev'));
  await app.listen(EnvConfig.port());

  console.log(
    'App is running on port %d in %s mode. Press CTRL-C to stop.',
    EnvConfig.port(),
    EnvConfig.environment(),
  );
}
bootstrap();
