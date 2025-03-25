import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Internal Api for chat real-time')
    .setDescription('CAUTION: This document is for internal use only')
    .addTag('chat')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);
};
