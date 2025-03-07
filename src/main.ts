import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setupSwagger } from '@app/common/swagger';

const _logger = new Logger('chat-real-time');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
