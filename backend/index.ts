import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { setGlobalOptions } from 'firebase-functions/v2';
import { onRequest } from 'firebase-functions/v2/https';
import { AppModule } from './src/app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('index.ts');

const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  await app.init();
};

const firebaseFunctionSettings = {
  cors: true,
  minInstances: 0,
  maxInstances: 2,
};

export const arePlantsPetsApi = onRequest(
  firebaseFunctionSettings,
  async (request, response) => {
    logger.log('Bootstrapping Nest.js application as a Firebase Function (v2)');
    await createFunction(expressServer);
    logger.log('Forwarding request to Nest.js application');
    expressServer(request, response);
  },
);
