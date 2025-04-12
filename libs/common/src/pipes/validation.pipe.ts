import { BadRequestException, HttpStatus, Optional, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class MainPipe extends ValidationPipe {
  constructor(@Optional() options: ValidationPipeOptions = {}) {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      ...options,
    });
  }

  protected exceptionFactory: (errors: ValidationError[]) => BadRequestException = (errors) => {
    const formattedErrors = this.formatErrors(errors);

    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  };

  private formatErrors(errors: ValidationError[]): any[] {
    return errors
      .map((error) => ({
        field: error.property,
        message: this.getMessage(error),
      }))
      .filter((error) => error.message);
  }

  private getMessage(error: ValidationError): string {
    if (error.constraints) {
      return Object.values(error.constraints)[0];
    }

    if (error.children && error.children.length) {
      return error.children.map((child) => this.getMessage(child)).join(', ');
    }

    return 'Validation failed';
  }
}
