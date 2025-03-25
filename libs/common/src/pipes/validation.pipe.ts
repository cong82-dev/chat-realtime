import { ValidationPipe } from '@nestjs/common';

export class MainPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  }
}
