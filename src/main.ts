import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@modules/app.module';
import { mapEnvToConfiguration } from '@modules/env/map-env-to-configuration';
import { config } from '@modules/document/doc-builder';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Too many requests from this IP, please try again later!',
    }),
  );

  const { api } = mapEnvToConfiguration();
  await app.listen(api.port);
}
bootstrap();
