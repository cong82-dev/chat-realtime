import { BadRequestException, HttpStatus, Optional, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { formatErrorPipeUtil } from '../utils/validate.util';
import { ERROR_TYPES_MESSAGE } from '../constants/message-api';

export class MainPipe extends ValidationPipe {
  constructor(@Optional() options: ValidationPipeOptions = {}) {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      ...options,
    });
  }

  protected exceptionFactory: (errors: ValidationError[]) => BadRequestException = (errors) => {
    const formattedErrors = formatErrorPipeUtil(errors);

    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ERROR_TYPES_MESSAGE.VALIDATE_ERROR,
      errors: formattedErrors,
    });
  };
}
