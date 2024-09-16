import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('NestJS Project')
  .setDescription('API Rest - NestJS')
  .setVersion('1.0')
  .addApiKey(
    {
      type: 'apiKey',
      name: 'authorization',
      in: 'header',
    },
    'authorization',
  )
  .build();
