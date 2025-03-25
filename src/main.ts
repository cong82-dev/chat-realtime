import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@app/common/swagger';
import { MainPipe } from '@app/common/pipes/validation.pipe';
import { TransformInterceptor } from '@app/common/interceptors/transform-response';
import { AllExceptionsFilter } from '@app/common/filters/bad-request.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new MainPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
